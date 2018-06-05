const apiUri = "https://beta-adrianjost.hackedit.de/api.php";

function loadEXT(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onreadystatechange=function(){4==n.readyState&&"200"==n.status?t(n.responseText):4==n.readyState&&t("noresponse")},n.send(null)}

// Instantiate a new A11yDialog module
var dialog;

const timeline = document.getElementById("timeline");
var YearWidthPixel = 300;
const MinYearWidthPixel = 100;
const MaxYearWidthPixel = 1000;
var allEvents = []
var minDate = 0;
var timeRange = 0;

function scale(factor){
  YearWidthPixel += YearWidthPixel * (factor * 0.05);
  YearWidthPixel = Math.min(Math.max(YearWidthPixel,MinYearWidthPixel),MaxYearWidthPixel);
  render();
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadEXT(apiUri+"?load=all",function(response){
      initialize(JSON.parse(response.trim()));
      render();
      openDialogByHash();
    });
});

function render(){
  setIntervals(minDate);
  setEvents(allEvents);
}

function initialize(events){
  allEvents = events;
  minDate = getMinDate(events);
  timeRange = Math.round(((new Date()) - minDate), 0);
  dialog = new A11yDialog(document.getElementById('article-dialog'));
  dialog.on('hide', function (dialogEl, event) {
    updateHash(' ');
  });
}

function getMinDate(events){
  const minDate = Math.min(...(events.map(event => {
    return new Date(event.date.from);
  })));
  return minDate;
}

function setIntervals(minDate){
  let years = "";
  const minYear = (new Date(minDate)).getFullYear();
  const minMonth = ((new Date(minDate)).getMonth()+1);
  
  const currentYear = (new Date()).getFullYear();
  const currentMonth = ((new Date()).getMonth()+1);

  const yearWidth = (100 / ((currentYear - minYear - 1) * 12 + currentMonth + (12 - minMonth + 1)) * 12);

  const firstYearWidth = (yearWidth * (12 - minMonth + 1) * 1/12);
  const currentYearWidth = (yearWidth * currentMonth * 1/12);

  years += `<li style="width:${firstYearWidth}%">${minYear}</li>`;
  for(var year=minYear+1; year < currentYear; year++){
      years += `<li style="width:${yearWidth}%">${year}</li>`
  }
  years += `<li style="width:${currentYearWidth}%">${currentYear}</li>`;
  document.getElementById("intervals").innerHTML = years;

  document.getElementById("timeline").style.width = ((currentYear - minYear) * YearWidthPixel) + "px";
}

function setEvents(events){
  let eventString = "";
  events.forEach(function(event){
    let left = ((event.date.from - minDate) / timeRange) * 100;
    let width = (((event.date.to || (new Date())) - event.date.from) / timeRange) * 100;
    
    eventString += `
      <li>
        <a class="bar level-${event.categorie}" 
          id="article-${event.id}"
          style="width: calc(${width}% - 16px); 
          left: calc(${left}% + 8px);"
          href="#article-${event.id}" target="_blank"
          data-level="level-${event.categorie}"
          data-image="${event.article.image}"
          data-id="${event.id}">
            <i class="material-icons">${event.icon}</i>
            <span class="title">${event.title}<span>
        </a>
      </li>`;
  });
  document.getElementById("events").innerHTML = eventString;
  document.querySelectorAll("#timeline #events a").forEach(node => {
    node.addEventListener("click", showTooltip);
  });
}

function updateHash(newHash){
  if(history.pushState) {
    history.pushState(null, null, newHash);
  }
  else {
      location.hash = newHash;
  }
}

function openDialog(element){
  loadEXT(apiUri+"?load="+element.getAttribute('data-id'),function(response){
    document.querySelector(".dialog-description").innerHTML = response.trim();
  });
  let text = "";
  if(element.getAttribute("data-image").length > 10){
    text += `<img src="${element.getAttribute("data-image")}"/>`
  }
  text += `<h1 class="${element.getAttribute('data-level')}">${element.querySelector(".title").textContent}</h1>
  <div class="dialog-description">loading...</div>
  <a class="dialog-more ${element.getAttribute('data-level')}" href="${element.href}" target="_blank">open</a>
  `;
  document.getElementById("article").innerHTML = text;
  const identifier = element.getAttribute("id");
  updateHash('#'+identifier);
  dialog.show();
}

function showTooltip(e){
  e.preventDefault();
  openDialog(this);
  return false;
}

function openDialogByHash(){
  const hash = location.hash.substr(1);
  if(hash.length > 0){
    const el = document.getElementById(hash);
    if(el) {openDialog(el);}
  }
}