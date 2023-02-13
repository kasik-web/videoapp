import * as api from "../services/TmdbService";
import * as events from "./events";

const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
let cards = document.querySelector(".cardbody");

export function renderMostPopular(page, scroll) { 
  cards.innerHTML = "";
  let fragment = "";

  api.getGenresList().then((result) => {
    const genres = result.genres;

    api.getMostPopular(page).then((res) => {

      for (let i = 0; i < res.results.length; i++) {
        const rDate = res.results[i].release_date.split('-');
        const overviewLength = 420;
        let overview = res.results[i].overview.slice(0, overviewLength);        
  
        let genresString = '';
        const count = 3;
        let curCount = 0;
        for(let k = 0; k < res.results[i].genre_ids.length; k++){
          genres.filter((genre) => {            
              if(genre.id === res.results[i].genre_ids[k]){                                             
                genresString += genre.name;
                if(curCount < res.results[i].genre_ids.length -1 && curCount < 2){
                  genresString += ", "
                }
              }
          })
          curCount++;
          if(curCount === count){break;}
        }         
  
        if(res.results[i].overview.length > overviewLength){
          overview += '...'
        }
        
        let heart = `<i></i>`
        if(!localStorage.getItem(res.results[i].id)){
          heart = `<i class="fa-regular fa-heart fa-2x"></i>`;
        }
        else if(localStorage.getItem(res.results[i].id)){
          heart = `<i class="fa-solid fa-heart fa-2x"></i>`;
        }


        
        fragment += `<div class="card mb-1" id="${res.results[i].id}"
        style="
          max-width: auto;
          border-width: 5px;
          background-color: rgba(22, 21, 21, 0.514);">
        <div class="row row-main g-0">
          <div class="col-md-2">
            <img
              src="${imageBaseUrl}${res.results[i].poster_path}"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-10 text-center ">
            <div class="row">            
                <div class="card-body ">
                  <div class="d-flex">
                    <div class="mr-auto p-3">
                      ${heart}
                    </div>
                    <div class="mr-auto ml-auto">
                      <h2 class="card-title mb-2">${res.results[i].title}</h2>
                      <h4 class="mb-2" > ${rDate[0]} | ${genresString}</h4>
                    </div> 
                    <div class="ml-auto p-3">
                      <h3>Imdb: ${res.results[i].vote_average}</h3>
                    </div>
                  </div>                  
                  <p class="card-text" style="font-size: 20px">
                  ${overview}
                  </p>               
                </div>
              
            </div>          
          </div>
      </div>
      </div>`;
      }
      const currentPage = res.page;
      if (currentPage == 1) {
        fragment += `
      <div class="row text-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination pagination-lg justify-content-center">
              <li class="page-item">
                <a class="page-link"  aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active" aria-current="page">
                <span class="page-link currentpage">1</span>
              </li>
              
              <li class="page-item">
                <a class="page-link"  aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>`;
      } else {
        fragment += `
        <div class="row text-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination pagination-lg justify-content-center">
                <li class="page-item">
                  <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                
                <li class="page-item active" aria-current="page">
                  <span class="page-link currentpage">${currentPage}</span>
                </li>              
                
                <li class="page-item">
                  <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>`;
      }
      cards.insertAdjacentHTML("afterbegin", fragment);
      
      events.btnEventPopular();      
      
      window.scrollTo(0, scroll);
    });
  })
  
}

export function renderSearchResult(request, page) {
  cards.innerHTML = "";
  let fragment = "";
  api.getSearchResults(request, page).then((res) => {
    for (let i = 0; i < res.results.length; i++) {
      fragment += `<div
              class="card mb-1"
              style="
                  max-width: auto;
                  border-width: 5px;
                  background-color: rgba(22, 21, 21, 0.514);
              "
              >
              <div class="row g-0">
                  <div class="col-md-2">
                  <img
                      src="${imageBaseUrl}${res.results[i].poster_path}"
                      class="img-fluid rounded-start"
                      alt="..."
                  />
                  </div>
                  <div class="col-md-10 text-center">
                  <div class="col-8 ml-auto mr-auto">
                      <div class="card-body">
                      <h1 class="card-title">${res.results[i].title}</h1>
                      <p class="card-text" style="font-size: 20px">
                          ${res.results[i].overview}
                      </p>
                      </div>
                  </div>
                  </div>
              </div>
              </div>`;
    }
    const currentPage = res.page;
    if (currentPage == 1) {
      fragment += `
    <div class="row text-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-lg justify-content-center">
            <li class="page-item">
              <a class="page-link"  aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item active" aria-current="page">
              <span class="page-link currentpage">1</span>
            </li>
            
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>`;
    } else {
      fragment += `
      <div class="row text-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination pagination-lg justify-content-center">
              <li class="page-item">
                <a class="page-link" href="" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              
              <li class="page-item active" aria-current="page">
                <span class="page-link currentpage">${currentPage}</span>
              </li>              
              
              <li class="page-item">
                <a class="page-link" href="" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>`;
    }
    cards.insertAdjacentHTML("afterbegin", fragment);
    
    events.btnEventSearch(request);
    

  });
}

export function renderMovieDetail(id){
  cards.innerHTML = "";
  let fragment = ""; 
 
  api.getMovieDetail(id).then((res) => {
  console.log(res) 
   const vote = Math.round(res.vote_average * 10) /10;
   const rDate = res.release_date.split('-');

   let genresString = '';
   let genresCount = 0;
   res.genres.forEach(genre => {
    genresString += genre.name;
    if(genresCount < res.genres.length -1){
      genresString += ', ';
      genresCount++;
    }
   });

   let creditsString = '';
   let creditsCount = 0;
   res.credits.cast.forEach(cast => {
    if(creditsCount < 7){
      creditsString += cast.name;
    }
    if(creditsCount < res.credits.cast.length -1 && creditsCount < 6){
      creditsString += ", "
    }    
    creditsCount++;    
   })
   
   let heart = `<i></i>`
        if(!localStorage.getItem(id)){
          heart = `<i class="fa-regular fa-heart fa-2x"></i>`;
        }
        else if(localStorage.getItem(id)){
          heart = `<i class="fa-solid fa-heart fa-2x"></i>`;
        }

   let trailer = '';
   if(res.videos.results[0]){
    trailer= res.videos.results[0].key;

    fragment += `
    <div class="card mb-1"
      style="
        max-width: auto;
        border-width: 5px;
        background-color: rgba(22, 21, 21, 0.514);">
      <div class="row row-main g-0">
        <div class="col-md-3">
          <div class="container ml-auto mr-auto sticky-top">
            <button class="btn btn-secondary btn-back p-2"
            style="z-index: 9999; position: absolute"><i class="fa-solid fa-arrow-left fa-2x"></i></button>
              <img
                src="${imageBaseUrl}${res.poster_path}"
                class="img-fluid rounded-start"
                alt="..."
              />
          </div>
        
        </div>
        <div class="col-md-9 text-center ">
          <div class="row">            
          <div class="card-body ">
          <div class="d-flex">
            <div class="mr-auto p-1">
              <button class="btn btn-outline btn-fav">${heart}</button>
            </div>
            <div class="mr-auto ml-auto p-2">
              <h2 class="card-title mb-2">${res.title}</h2>
              <h4 class="mb-2" > ${rDate[0]}</h4>
              <h5 class="mb-3">Жанры: ${genresString}</h5>
              <h6 class="mb-3">В ролях: ${creditsString}</h6>
            </div> 
            <div class="ml-auto p-3">
              <h3>Imdb: ${vote}</h3>
            </div>
          </div>                  
          <p class="card-text" style="font-size: 18px">
          ${res.overview}
          </p>               
                <iframe id="ytplayer" type="text/html" width="95%" height="400"
                    src="http://www.youtube.com/embed/${trailer}"
                    frameborder="0"
                    showinfo="0"
                    fs="0"
                    disablekb="0"
                    rel="0"
                  ></iframe>
              </div>            
            </div>          
        </div>
      </div>
    </div>`;
    
    cards.insertAdjacentHTML("afterbegin", fragment);
    events.clickOnBackButton();
    events.Favorite(id);
   }
   else if(!res.videos.results[0]){
    api.getMovieTrailerEn(id).then((result) =>{
      if(!result.results[0]){
        trailer = "";
      }
      else{
        trailer = result.results[0].key;
      }  
      

      fragment += `
    <div class="card mb-1"
      style="
        max-width: auto;
        border-width: 5px;
        background-color: rgba(22, 21, 21, 0.514);">
      <div class="row row-main g-0">
        <div class="col-md-3">
          <div class="container ml-auto mr-auto sticky-top">
            <button class="btn btn-secondary btn-back p-2"
            style="z-index: 9999; position: absolute"><i class="fa-solid fa-arrow-left fa-2x"></i></button>
              <img
                src="${imageBaseUrl}${res.poster_path}"
                class="img-fluid rounded-start"
                alt="..."
              />
          </div>
        
        </div>
        <div class="col-md-9 text-center ">
          <div class="row">            
          <div class="card-body ">
          <div class="d-flex">
            <div class="mr-auto p-1">
              <button class="btn btn-outline btn-fav">${heart}</button>
            </div>
            <div class="mr-auto ml-auto p-2">
              <h2 class="card-title mb-2">${res.title}</h2>
              <h4 class="mb-2" > ${rDate[0]}</h4>
              <h5 class="mb-3">Жанры: ${genresString}</h5>
              <h6 class="mb-3">В ролях: ${creditsString}</h6>
            </div> 
            <div class="ml-auto p-3">
              <h3>Imdb: ${vote}</h3>
            </div>
          </div>                  
          <p class="card-text" style="font-size: 18px">
          ${res.overview}
          </p>               
                <iframe id="ytplayer" type="text/html" width="95%" height="400"
                    src="http://www.youtube.com/embed/${trailer}"
                    frameborder="0"
                    showinfo="0"
                    fs="0"
                    disablekb="0"
                    rel="0"
                  ></iframe>
              </div>            
            </div>          
        </div>
      </div>
    </div>`;
    
    cards.insertAdjacentHTML("afterbegin", fragment);
    events.clickOnBackButton();  
    events.Favorite(id);
    })
   }   
   
  })  
}

