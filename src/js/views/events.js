import * as ui from "./UI";

export function btnEventPopular() {
  const btnNext = document.querySelector('[aria-label="Next"]');
  const btnPrev = document.querySelector('[aria-label="Previous"]');
  const currentPage = document.querySelector(".currentpage");
  
  
  const page = Number(currentPage.textContent);

  btnNext.addEventListener("click", () => {
    ui.renderMostPopular(0, page + 1);
    console.log(page +1)
    history.pushState({page: history.state.page + 1 , curPage: page + 1}, '', `most_popular&p=${page + 1}`);
    
  });

  btnPrev.addEventListener("click", () => {
    ui.renderMostPopular(0, page - 1);
    history.pushState({page: history.state.page, curPage: page}, `most_popular&p=${page - 1}`); 
  });
}

export function btnEventSearch(request) {
  const btnNext = document.querySelector('[aria-label="Next"]');
  const btnPrev = document.querySelector('[aria-label="Previous"]');
  const currentPage = document.querySelector(".currentpage");
  const page = Number(currentPage.textContent);

  btnNext.addEventListener("click", (e) => {
    ui.renderSearchResult(request, page + 1);
  });

  btnPrev.addEventListener("click", (e) => {
    ui.renderSearchResult(request, page - 1);
  });
}

export function clickOnMovieToDetail(){
  const movie = document.querySelector(".cardbody");  
  
  movie.addEventListener('click', (e) => {       
    let card = e.target;
    
    while (!card.querySelector('.row-main')){     
      card = card.parentElement;          
    }

    if(card.id){
      const movieId = card.id;      
      localStorage.setItem('scroll', window.pageYOffset);      
      history.replaceState({page: history.state.page, scrollTop: window.pageYOffset}, '');
      history.pushState({page: history.state.page + 1}, '', `/movie_id=${movieId}`);     
      ui.renderMovieDetail(movieId);                  
    }     
  })
}

export function Favorite(id){
  let favorites = [];
  const btnFav = document.querySelector('.btn-fav');  
  btnFav.addEventListener('click', (e) => {
    
    if(!JSON.parse(localStorage.getItem('fav'))){      
      favorites[0] = id;
    }
    else if(!JSON.parse(localStorage.getItem('fav')).includes(id)){
      favorites = JSON.parse(localStorage.getItem('fav'));
      favorites.push(id);          
    }
    else if(JSON.parse(localStorage.getItem('fav')).includes(id)){
      favorites = JSON.parse(localStorage.getItem('fav'));
      favorites.pop(favorites.findIndex((e) => e === id));
    }  
    localStorage.setItem('fav', JSON.stringify(favorites));
    ui.renderMovieDetail(id);    
  })
}

export function clickRecomendation(id){  
  const recommendationCard = document.querySelector(".row-rec");
  recommendationCard.addEventListener('click', (e) => {
    console.log("Click rec")    
    setNavigate(id);
    ui.renderMovieDetail(e.target.id);
    history.pushState({page: history.length + 1}, '', `/movie_id=${e.target.id}`);
  })  
} 

let navigate = [{}];
function setNavigate(id){
  navigate.push({movieId: id, scroll: window.pageYOffset})
  console.log(navigate);
}

function getNavigate(){
  if(navigate.length == 1){
    return;
  }  
  return navigate[navigate.length -1];    
}

export function scrollUp(){
  const btnUp = document.querySelector("#btnUp");
  btnUp.addEventListener('click', (e) => {
    window.scrollTo(0, 0);
  })
}



