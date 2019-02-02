"use strict";

const apiUri = "https://beta-adrianjost.hackedit.de/api.php";

@import './src/static/helper.js'


var dialog = new A11yDialog(document.getElementById('article-dialog'));
const timelineWrapper = document.querySelector(".timeline-wrapper");
const timeline = document.querySelector("#timeline");
const body = document.querySelector("body");
var YearWidthPixel = 300;
var MinYearWidthPixel = 100;
var MaxYearWidthPixel = 1000;
var allEvents = []
var minDate = 0;
var timeRange = 0;

document.addEventListener("DOMContentLoaded", function(event) {
  loadEXT(apiUri+"?load=all",function(response){
    initializeTimeline(JSON.parse(response.trim()));
    render();
    openDialogByHash();
  });
  initializeDialog();
});

// Instantiate a new A11yDialog module
function initializeDialog(){
  dialog.on('hide', function (dialogEl, event) {
    updateHash(' ');
    body.classList.remove("dialog-open");
  });
}

function initializeTimeline(events){
  allEvents = events;
  minDate = getMinDate(events);
  timeRange = Math.round(((new Date()) - minDate), 0);

  timelineWrapper.addEventListener("wheel", function(event){
    if(event.ctrlKey && event.path.some((parentSelector) => ((parentSelector.classList || {}).value || "").includes("timeline-wrapper"))){
      event.preventDefault();
      const scaleFactor = 0.01;
      scaleTimeline((event.deltaY < 0)?scaleFactor:-scaleFactor);
      return;
    }else{
      if(event.deltaX == 0){
        const deltaBottom = body.scrollHeight - window.innerHeight - window.pageYOffset;
        const deltaRight = timelineWrapper.scrollWidth - (timelineWrapper.scrollLeft + timelineWrapper.offsetWidth)
        if(deltaBottom <= 0 && event.deltaY > 0 || event.deltaY < 0 && deltaRight > 0){
          event.preventDefault();
          timelineWrapper.scrollLeft -= event.deltaY;
          return;
        }
      }
    }
  });
}

function scaleTimeline(factor){
  const YearWidthPixelBefore = YearWidthPixel;
  YearWidthPixel += YearWidthPixel * factor;
  YearWidthPixel = Math.min(Math.max(YearWidthPixel,MinYearWidthPixel),MaxYearWidthPixel);
  render();
}

function render(){
  setIntervals(minDate);
  setEvents(allEvents);
}

function setIntervals(minDate){
  let years = "";
  const minYear = (new Date(minDate)).getFullYear();
  const minMonth = ((new Date(minDate)).getMonth()+1);
  
  const currentYear = (new Date()).getFullYear();
  const currentMonth = ((new Date()).getMonth()+1);

  MinYearWidthPixel = screen.width / (currentYear - minYear);
  MaxYearWidthPixel = screen.width;

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
    node.addEventListener("click", openDialogOnEvent);
  });
}

function openDialog(element){
  body.classList.add("dialog-open");
  let text = "";
  if(element.getAttribute("data-image").length > 10){
    text += `<img src="${element.getAttribute("data-image")}"/>`
  }
  text += `<h1 class="${element.getAttribute('data-level')}">${element.querySelector(".title").textContent}</h1>
  <div class="dialog-description">loading...</div>
  <a class="dialog-more ${element.getAttribute('data-level')}" href="${element.href}" target="_blank">open</a>
  `;
  document.getElementById("article").innerHTML = text;
  loadEXT(apiUri+"?load="+element.getAttribute('data-id'),function(response){
    document.querySelector(".dialog-description").innerHTML = response.trim();
  });
  const identifier = element.getAttribute("id");
  updateHash('#'+identifier);
  dialog.show();
}

function openDialogOnEvent(e){
  e.preventDefault();
  //e.stopPropagation();
  openDialog(this);
}

function openDialogByHash(){
  const hash = location.hash.substr(1);
  if(hash.length > 0){
    const el = document.getElementById(hash);
    if(el) {openDialog(el);}
  }
}