function label_count(teamName) 
{
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(teamName);
  
  var labels = filter_labels(GmailApp.getUserLabels(),teamName);

  var unreadCountArray = [];
  var currentCountArray = [];
  var unreadCount = 0;
  var currentCount = 0;
  
  for(var l in labels)
  {
    var currentVal = getCurrentCount(labels[l]);
    var unreadVal = labels[l].getUnreadCount();
    unreadCountArray.push(unreadVal);
    currentCountArray.push(currentVal);
    
    unreadCount = unreadCount + unreadVal;
    currentCount = currentCount + currentVal;
  }
  
  ss.clear();

  anext = "A".concat(ss.getLastRow()+1+"");
  bnext = "B".concat(ss.getLastRow()+1+"");
  cnext = "C".concat(ss.getLastRow()+1+"");

  ss.getRange(anext).setValue("Name");
  ss.getRange(bnext).setValue("Pending Mails");
  ss.getRange(cnext).setValue("Replied Mails");
  
  for (var i=0; i<labels.length; i++) 
  {
        
    anext = "A".concat(ss.getLastRow()+1+"");
    bnext = "B".concat(ss.getLastRow()+1+"");
    cnext = "C".concat(ss.getLastRow()+1+"");
    
    var labelName = labels[i].getName();
    var shortenLabel = labelName.substring(labelName.indexOf('/')+1);
    var moreCleaned = shortenLabel.substring(shortenLabel.indexOf('.')+1);
    
    ss.getRange(anext).setValue(moreCleaned);
    ss.getRange(bnext).setValue(unreadCountArray[i]);
    ss.getRange(cnext).setValue(currentCountArray[i]);
  } 
  
  anext = "A".concat(ss.getLastRow()+1+"");
  bnext = "B".concat(ss.getLastRow()+1+"");
  cnext = "C".concat(ss.getLastRow()+1+"");
  ss.getRange(anext).setValue("PROGRESS CALCULATED FROM: "+getBaseTimeStamp()+" TO: "+Utilities.formatDate(new Date(), getTimeZone(), "dd MMM yyyy hh:mm aaa"));
  ss.getRange(bnext).setValue(unreadCount);
  ss.getRange(cnext).setValue(currentCount);
    
}

function filter_labels(labels, teamName)
{
  var accepted_labels = [];
  var count = labels.length;
  for( var i = 0; i<count ; i++)
  {
    if(labels[i].getName().indexOf(teamName) != -1)
      accepted_labels.push(labels[i]);
  }
  return accepted_labels.sort();
}

function TeamA()
{
  label_count("Team A");
}

function TeamB()
{
  label_count("Team B");
}

function TeamC()
{
  label_count("Background Team");
}

function onOpen() {  
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet.addMenu("Progress Tracker", [{name: "Team A Status", functionName: "TeamA"},{name: "Team B Status", functionName: "TeamB"},{name: "Background Team Status", functionName: "TeamC"}]);
}
