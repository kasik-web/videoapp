
import * as ui from "./UI";

export function btnEventPopular() {
  const btnNext = document.querySelector('[aria-label="Next"]');
  const btnPrev = document.querySelector('[aria-label="Previous"]');
  const currentPage = document.querySelector(".currentpage");   
  const page = Number(currentPage.textContent);

  btnNext.addEventListener("click", () => {
    ui.renderMostPopular(0, page + 1);    
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

  btnNext.addEventListener("click", () => {
    ui.renderSearchResult(request, page + 1);
  });

  btnPrev.addEventListener("click", () => {
    ui.renderSearchResult(request, page - 1);
  });
}

export function clickOnMovieToDetail(){

  if(localStorage.getItem('viewType') === "card"){
    const movie = document.querySelector(".cards");

    movie.addEventListener('click', (e) => {       
      let card = e.target;
         
      let btn = false;
      while (!card.querySelector('.card-main')){     
        card = card.parentElement;        
        if(card === card.parentElement.querySelector('.btn-fav')){
          btn = true;
        }      
      }
      if(card.id){
        const movieId = card.id;
        const btnFav = card.querySelector('.btn-fav')
  
        let favorites = [];
        if(btn){        
          if(!JSON.parse(localStorage.getItem('fav'))){      
            favorites[0] = movieId;
            btnFav.innerHTML = `<i class="fa-regular fa-heart fa-2x"></i>`;      
          }
          else if(!JSON.parse(localStorage.getItem('fav')).includes(movieId)){
            favorites = JSON.parse(localStorage.getItem('fav'));
            favorites.push(movieId);
            btnFav.innerHTML = `<i class="fa-solid fa-heart fa-2x"></i>`;               
          }
          else if(JSON.parse(localStorage.getItem('fav')).includes(movieId)){
            favorites = JSON.parse(localStorage.getItem('fav'));
            favorites.splice(favorites.findIndex((e) => e === movieId), 1);
            btnFav.innerHTML = `<i class="fa-regular fa-heart fa-2x"></i>`;      
          }  
          localStorage.setItem('fav', JSON.stringify(favorites));
        }
        else{
          localStorage.setItem('scroll', window.pageYOffset);      
          history.replaceState({page: history.state.page, scrollTop: window.pageYOffset}, '');
          history.pushState({page: history.state.page + 1}, '', `/movie_id=${movieId}`);     
          ui.renderMovieDetail(movieId);
        }                       
      }     
    })
  }

  else if(localStorage.getItem('viewType') === "list"){
    const movie = document.querySelector(".cardbody");
    
  movie.addEventListener('click', (e) => {       
    let card = e.target;    
    let btn = false;
    while (!card.querySelector('.row-main')){     
      card = card.parentElement;      
      
      if(card === card.parentElement.querySelector('.btn-fav')){
        btn = true;
      }      
    }

    if(card.id){
      const movieId = card.id;
      const btnFav = card.querySelector('.btn-fav')

      let favorites = [];
      if(btn){        
        if(!JSON.parse(localStorage.getItem('fav'))){      
          favorites[0] = movieId;
          btnFav.innerHTML = `<i class="fa-regular fa-heart fa-2x"></i>`;      
        }
        else if(!JSON.parse(localStorage.getItem('fav')).includes(movieId)){
          favorites = JSON.parse(localStorage.getItem('fav'));
          favorites.push(movieId);
          btnFav.innerHTML = `<i class="fa-solid fa-heart fa-2x"></i>`;               
        }
        else if(JSON.parse(localStorage.getItem('fav')).includes(movieId)){
          favorites = JSON.parse(localStorage.getItem('fav'));
          favorites.splice(favorites.findIndex((e) => e === movieId), 1);
          btnFav.innerHTML = `<i class="fa-regular fa-heart fa-2x"></i>`;      
        }  
        localStorage.setItem('fav', JSON.stringify(favorites));
      }
      else{
        localStorage.setItem('scroll', window.pageYOffset);      
        history.replaceState({page: history.state.page, scrollTop: window.pageYOffset}, '');
        history.pushState({page: history.state.page + 1}, '', `/movie_id=${movieId}`);     
        ui.renderMovieDetail(movieId);
      }                       
    }     
  })
  }
  
}

export function Favorite(id){
  let favorites = [];
  const btnFav = document.querySelector('.btn-fav');
  
  btnFav.addEventListener('click', (e) => {
    console.log(`fav-id ${id}`);
    if(!JSON.parse(localStorage.getItem('fav'))){      
      favorites[0] = id;
      btnFav.innerHTML = `<i class="fa-regular fa-heart fa-2x"></i>`;      
    }
    else if(!JSON.parse(localStorage.getItem('fav')).includes(id)){
      favorites = JSON.parse(localStorage.getItem('fav'));
      favorites.push(id);
      btnFav.innerHTML = `<i class="fa-solid fa-heart fa-2x"></i>`;               
    }
    else if(JSON.parse(localStorage.getItem('fav')).includes(id)){
      favorites = JSON.parse(localStorage.getItem('fav'));
      favorites.splice(favorites.findIndex((e) => e === id), 1);
      btnFav.innerHTML = `<i class="fa-regular fa-heart fa-2x"></i>`;      
    }  
    localStorage.setItem('fav', JSON.stringify(favorites));
  })
}

export function clickRecomendation(id){  
  const recommendationCard = document.querySelector(".row-rec");  
  recommendationCard.addEventListener('click', (e) => {    
    ui.renderMovieDetail(e.target.id);
    history.pushState({page: history.state.page + 1}, '', `/movie_id=${e.target.id}`);
  })  
}

export function scrollUp(){
  const btnUp = document.querySelector("#btnUp");
  btnUp.addEventListener('click', (e) => {
    window.scrollTo(0, 0);
  })
}

export function viewType(){
  const btnView = document.querySelector('#renderType');

  if(localStorage.getItem('viewType') === null){
    btnView.innerHTML = `<i class="fa-solid fa-table-list"></i>`;
    localStorage.setItem('viewType', 'list');
  }
  else if(localStorage.getItem('viewType') === "list"){
    btnView.innerHTML = `<i class="fa-solid fa-table-list"></i>`;
  }
  else if(localStorage.getItem('viewType') === "card"){
    btnView.innerHTML = `<i class="fa-solid fa-table-cells-large"></i>`;
  }
  
  btnView.addEventListener('click', () => {
    if(localStorage.getItem('viewType') === null){
      localStorage.setItem('viewType', 'card');
      btnView.innerHTML = `<i class="fa-solid fa-table-cells-large"></i>`;
    }
    else if(localStorage.getItem('viewType') === "list"){
      localStorage.setItem('viewType', 'card');
      btnView.innerHTML = `<i class="fa-solid fa-table-cells-large"></i>`;
    }
    else if(localStorage.getItem('viewType') === "card"){
      localStorage.setItem('viewType', 'list');
      btnView.innerHTML = `<i class="fa-solid fa-table-list"></i>`;
    }

    location.reload();
  })
}




