import * as ui from "./UI";

export function btnEventPopular() {
  const btnNext = document.querySelector('[aria-label="Next"]');
  const btnPrev = document.querySelector('[aria-label="Previous"]');
  const currentPage = document.querySelector(".currentpage");
  
  
  const page = Number(currentPage.textContent);

  btnNext.addEventListener("click", (e) => {
    ui.renderMostPopular(page + 1);
  });

  btnPrev.addEventListener("click", (e) => {
    ui.renderMostPopular(page - 1);
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
        console.log("OnClickHendler")
    let card = e.target;
    while (!card.querySelector('.row-main')){     
      card = card.parentElement;           
    }

    if(card.id){
      const movieId = card.id;      
      localStorage.setItem('scroll', window.pageYOffset);
      console.log("Click to Details")
      ui.renderMovieDetail(movieId);              
    }     
  })
}

export function clickOnBackButton(){
  const btnBack = document.querySelector(".btn-back");
  btnBack.addEventListener('click', (e) => {  
    ui.renderMostPopular(localStorage.getItem('page'), localStorage.getItem('scroll'));    
  });
}

export function Favorite(id){
  const btnFav = document.querySelector('.btn-fav');
  btnFav.addEventListener('click', (e) => {
    if(!localStorage.getItem(id)){
      
      localStorage.setItem(id, 'true');
    }
    else{
      localStorage.removeItem(id);     
    }
    ui.renderMovieDetail(id);
  })
}

