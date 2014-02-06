function uploadToDB(Label, currentJSON)
{
  /* Return if DB already have snapshot for current */
  var db = ScriptDb.getMyDb();
  var result = db.query({labelName: Label.getName(),date: Utilities.formatDate(new Date(), getTimeZone(), "yyyy-MM-dd")});
  if(result.hasNext())
    return;

  cleanDB();
  db.save(currentJSON);
}

function getCurrentJSON(Label)
{
  var threads = Label.getThreads();
    
  var uploadJSON = {};
  var threadJSONArray = [];
  uploadJSON.threadJSONArray = threadJSONArray;
  
  for(var t in threads)
  {
    var threadJSON = {};
    threadJSON.id = threads[t].getId();
    threadJSON.isUnread = threads[t].isUnread();
    uploadJSON.threadJSONArray.push(threadJSON);
  }
  
  
  uploadJSON.labelName = Label.getName();
  uploadJSON.date = Utilities.formatDate(new Date(), getTimeZone(), "yyyy-MM-dd");
  uploadJSON.timestamp = Utilities.formatDate(new Date(), getTimeZone(), "dd MMM yyyy hh:mm aaa");
  
  return uploadJSON;
}

function getBasePointJSON(Label)
{ 
  var db = ScriptDb.getMyDb();
  var result = db.query({labelName: Label.getName(),date: Utilities.formatDate(new Date(), getTimeZone(), "yyyy-MM-dd")});
  if(result.getSize() > 1)
    Logger.log("MULTIPLE RECORDS DETECTED FOR LABEL "+Label.getName()+" ON "+Utilities.formatDate(new Date(), getTimeZone(), "yyyy-MM-dd"));
  if(result.hasNext())
    return result.next();
  else 
  {
    Logger.log("NO RECORD FOR LABEL "+Label.getName()+" ON "+Utilities.formatDate(new Date(), getTimeZone(), "yyyy-MM-dd"));
    var currentJSON = getCurrentJSON(Label);
    uploadToDB(Label, currentJSON);
    return null;
  }
}

function cleanDB()
{
  var LOOKBACK = 10;
  var HISTORY = 4;

  var db = ScriptDb.getMyDb();
  
  for(var i=HISTORY; i<LOOKBACK; i++)
  {
    var date = new Date();
    date.setDate(date.getDate()-i);
    var result = db.query({date: Utilities.formatDate(date, getTimeZone(), "yyyy-MM-dd")});
    while(result.hasNext())
    {
      db.remove(result.next());
    }
  }
}

function getTimeZone()
{
  return "IST"; 
}



function test()
{
  sendMail();
}
