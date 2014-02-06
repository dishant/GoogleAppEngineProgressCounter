var baseTimeStamp;

function getCurrentCount(Label) 
{
  var currentJSON = getCurrentJSON(Label);
  var basePointJSON = getBasePointJSON(Label);
  if(basePointJSON == null) return 0;  
  
  baseTimeStamp = basePointJSON.timestamp;
  
  var count = unreadInBasePointMissingOrReadCurrent(currentJSON, basePointJSON) + missingBasePointReadcurrent(currentJSON, basePointJSON);
  return count;
}

function getBaseTimeStamp()
{
  return baseTimeStamp;
}

function timedDBUpdate()
{
  var labels = filter_labels(GmailApp.getUserLabels(),"Team");
  for(var l in labels)
  {
    uploadToDB(labels[l], getCurrentJSON(labels[l]));
  }
}
