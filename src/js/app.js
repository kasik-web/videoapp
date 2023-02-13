import "../css/style.css";
import * as ui from "./views/UI";
import * as events from "../js/views/events";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid"; // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import "@fortawesome/fontawesome-free/js/regular"; // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import "@fortawesome/fontawesome-free/js/brands"; // https://fontawesome.com/icons?d=gallery&s=brands&m=free

document.addEventListener("DOMContentLoaded", (e) => {  
  ui.renderMostPopular(); 
  events.clickOnMovieToDetail();
});

const btnSearch = document.querySelector(".btnsearch");
const request = document.querySelector(".input");



btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  ui.renderSearchResult(request.value);
});



