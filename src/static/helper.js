function loadEXT(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onreadystatechange=function(){4==n.readyState&&"200"==n.status?t(n.responseText):4==n.readyState&&t("noresponse")},n.send(null)}

function updateHash(newHash){
  if(history.pushState) {
    history.pushState(null, null, newHash);
  } else {
    location.hash = newHash;
  }
}

function getMinDate(events){
  const minDate = Math.min(...(events.map(event => {
    return new Date(event.date.from);
  })));
  return minDate;
}