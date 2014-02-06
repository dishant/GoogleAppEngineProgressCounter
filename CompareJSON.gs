function unreadInBasePointMissingOrReadCurrent(currentJSON, basePointJSON) 
{
  var currentJSONArray = currentJSON.threadJSONArray;
  var basePointJSONArray = basePointJSON.threadJSONArray;
  var selectedId = [];
  
  for(var y in basePointJSONArray)
  {
    if(basePointJSONArray[y].isUnread)
    {
      var JSONObject = exists(currentJSONArray,basePointJSONArray[y].id);
      
      //Missing current
      if(JSONObject == null)
      {
          selectedId.push(basePointJSONArray[y].id);
      }
      
      //Read current
      else if(!JSONObject.isUnread)
      {
        selectedId.push(basePointJSONArray[y].id);
      }
    }
         
  }
  
  
  return selectedId.length;     
}

function missingBasePointReadcurrent(currentJSON, basePointJSON)
{
  var currentJSONArray = currentJSON.threadJSONArray;
  var basePointJSONArray = basePointJSON.threadJSONArray;
  var selectedId = [];
  
  for(var t in currentJSONArray)
  {
    if(!currentJSONArray[t].isUnread)
    {
      if(exists(basePointJSONArray,currentJSONArray[t].id) == null)
      {
        selectedId.push(currentJSONArray[t].id);
      }
    }
  }

  return selectedId.length;
}


function exists(JSONArray,id)
{
  for(var t in JSONArray)
  {
    if(JSONArray[t].id == id)
      return JSONArray[t];
  }
  return null;
}
