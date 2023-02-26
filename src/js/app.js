import "../css/style.css";
import * as ui from "./views/UI";
import * as events from "../js/views/events";
import * as lang from "../js/views/language";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid"; // https://fontawesome.com/icons?d=gallery&s=solid&m=free
import "@fortawesome/fontawesome-free/js/regular"; // https://fontawesome.com/icons?d=gallery&s=regular&m=free
import "@fortawesome/fontawesome-free/js/brands"; // https://fontawesome.com/icons?d=gallery&s=brands&m=free


document.addEventListener("DOMContentLoaded", (e) => {
  lang.langSelect();
    
  if(document.location.href === 'http://localhost:9000/' || document.location.href === 'http://localhost:9000/most_popular&p=1' ||
    document.location.href === 'https://video-app-site.web.app/' || document.location.href === 'https://video-app-site.web.app/most_popular&p=1'){
    history.replaceState({}, '', `most_popular&p=1`);
    ui.renderMostPopular();
  }
  else{
    const url = document.location.pathname;
    
    if(document.location.pathname === "/favorite_movies"){
      history.replaceState({page: history.state.page, scrollTop: window.pageYOffset}, '');
      history.pushState({page: history.state.page + 1}, '', '/favorite_movies');
      ui.renderFavoriteList();
    }
    if(url.includes('movie_id')){
      const id = url.split('=');
      ui.renderMovieDetail(id[1]);
    }
  }  
  events.clickOnMovieToDetail();
  events.scrollUp();
});

const btnSearch = document.querySelector(".btnsearch");
const request = document.querySelector(".input");
const btnUp = document.querySelector('#btnUp');
const btnFavorite = document.querySelector('#btnFavorite');
const btnHome = document.querySelector('.home');

window.addEventListener('popstate', (e) => {
  let route = document.location.pathname;  
  route = route.split('/');
  route = route[1].split('&');
  
  if(route[0] === 'most_popular'){    
    ui.renderMostPopular(history.state.scrollTop, route[1].slice(2));
    console.log(route[1].slice(2))
  }

  route = document.location.pathname;
  route = route.split('/');  
  if(route[1] === 'favorite_movies'){
    ui.renderFavoriteList(history.state.scrollTop);
  }

  route = document.location.pathname;
  route = route.split('=');  
  if(route[0] === '/movie_id'){
    ui.renderMovieDetail(route[1]);    
  }
});

window.onscroll = () => {
  if(window.pageYOffset > 600){
    btnUp.style.display = "block"    
  }
  else{
    btnUp.style.display = 'none';
  }
}

btnHome.addEventListener('click', () => {
  e.preventDefault();
  ui.renderMostPopular();
})

btnFavorite.addEventListener('click', () => {
  history.replaceState({page: history.state.page, scrollTop: window.pageYOffset}, '');
  history.pushState({page: history.state.page + 1}, '', '/favorite_movies');
  ui.renderFavoriteList();  
})

btnHome.addEventListener('click', (e) => {
  e.preventDefault();
  history.pushState({page: history.state.page + 1}, '', `most_popular&p=1`);
  ui.renderMostPopular();
})

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  ui.renderSearchResult(request.value);
});