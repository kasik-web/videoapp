import * as api from "../services/TmdbService";
import * as events from "./events";
import * as lang from "./language"

const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
let cards = document.querySelector(".cardbody");

export function renderMostPopular(scroll = 0, page = 1) {
  cards = document.querySelector(".cardbody");  
  cards.innerHTML = '';
  let fragment = '';
  let cardview = false;

  history.pushState({page: history.state.page + 1 , curPage: page}, '', `most_popular&p=${page}`);
  if(localStorage.getItem('viewType') === 'card'){cardview = true}

  if(cardview){
    fragment = `<div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 text-center mt-1 mb-3 ms-2 me-2 g-2 cards">`;
  }
  else{
    fragment = '';
  }
  
  let favorites = JSON.parse(localStorage.getItem('fav'));  

  api.getGenresList().then((result) => {
    const genres = result.genres;

    api.getMostPopular(page).then((res) => {
      
      for (let i = 0; i < res.results.length; i++) {
        let rDate;
        if(res.results[i].release_date == null){
          rDate = "-";
        }
        else{
          rDate = res.results[i].release_date.split('-');
        }
        
        const overviewLength = 400;
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
        if(favorites === null){
          heart = `<i class="fa-regular fa-heart fa-2x"></i>`;
        }
        else{
            if(!favorites.includes(String(res.results[i].id))){
              heart = `<i class="fa-regular fa-heart fa-2x"></i>`;
            }
            else if(favorites.includes(String(res.results[i].id))){
              heart = `<i class="fa-solid fa-heart fa-2x"></i>`;
            }      
        }  
    
        if(!cardview){
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
                    <div class="d-flex" >
                      <div class="mr-auto heart">
                        <button class="btn btn-outline btn-fav">${heart}</button>
                      </div>
                      <div class="mr-auto ml-auto" style="overflow-x:hidden;">
                        <h2 class="card-title mb-2" >${res.results[i].title}</h2>
                        <h4 class="mb-2" > ${rDate[0]} | ${genresString}</h4>
                      </div> 
                      <div class="ml-auto p-1">
                        <h3>Imdb: ${res.results[i].vote_average}</h3>
                      </div>
                    </div>                  
                    <p style="font-size: 18px">
                    ${overview}
                    </p>               
                  </div>
                
              </div>          
            </div>
        </div>
        </div>`;
        }
        else{          
          fragment += `
          <div class="col"  id="${res.results[i].id}">
            <div class="card text-bg-dark card-main h-100"  >
              <img src="${imageBaseUrl}${res.results[i].poster_path}"  class="card-img" alt="...">
              <div class="card-img">                  
                <div class="row">
                  <div class="col-6">
                    <button style="background: rgba(150, 150, 150, 0.85); position: absolute; bottom: 0%; left: 0%;" class="btn btn-outline btn-fav">${heart}</button>                                          
                  </div>
                  <div class="col-6">
                  <h5 class="text-dark" style="position: absolute; bottom: 1%; right: 0%; background: rgba(150, 150, 150, 0.85)">Imdb: ${res.results[i].vote_average}</h5>
                  </div>  
                </div>
              </div>
            </div>
          </div>             
        `
        }          
               
      }
      fragment += `</div>`

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
      window.scrollTo(0, scroll);
      events.clickOnMovieToDetail();
      events.btnEventPopular();
    });
        
  })
   
}

export function renderSearchResult(request, page = 1) {
  cards = document.querySelector(".cardbody");  
  cards.innerHTML = '';
  let fragment = '';
  let cardview = false;

  if(localStorage.getItem('viewType') === 'card'){cardview = true}

  if(cardview){
    fragment = `<div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 text-center mt-1 mb-3 ms-2 me-2 g-2 cards">`;
  }
  else{
    fragment = '';
  }
  
  let favorites = JSON.parse(localStorage.getItem('fav'));
  
  history.pushState({page: history.state.page + 1}, '', `/search=${request}&page=${page}`); 

  api.getGenresList().then((result) => {
    const genres = result.genres;
  
      api.getSearchResults(request, page).then((res) => {

        console.log(res)
        for (let i = 0; i < res.results.length; i++) {
          const rDate = res.results[i].release_date.split('-');
          const overviewLength = 400;
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
          if(favorites === null){
            heart = `<i class="fa-regular fa-heart fa-2x"></i>`;
          }
          else{
              if(!favorites.includes(String(res.results[i].id))){
                heart = `<i class="fa-regular fa-heart fa-2x"></i>`;
              }
              else if(favorites.includes(String(res.results[i].id))){
                heart = `<i class="fa-solid fa-heart fa-2x"></i>`;
              }      
          }  
      
          if(!cardview){
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
                        <div class="mr-auto p-1 heart">
                          <button class="btn btn-outline btn-fav">${heart}</button>
                        </div>
                        <div class="mr-auto ml-auto">
                          <h2 class="card-title mb-2" >${res.results[i].title}</h2>
                          <h4 class="mb-2" > ${rDate[0]} | ${genresString}</h4>
                        </div> 
                        <div class="ml-auto p-1">
                          <h3>Imdb: ${Math.round(res.results[i].vote_average *10)/10}</h3>
                        </div>
                      </div>                  
                      <p style="font-size: 18px">
                      ${overview}
                      </p>               
                    </div>
                  
                </div>          
              </div>
          </div>
          </div>`;
          }
          else{          
            fragment += `
            <div class="col"  id="${res.results[i].id}">
              <div class="card text-bg-dark card-main h-100"  >
                <img src="${imageBaseUrl}${res.results[i].poster_path}"  class="card-img" alt="...">
                <div class="card-img">                  
                  <div class="row">
                    <div class="col-6">
                      <button style="background: rgba(150, 150, 150, 0.85); position: absolute; bottom: 0%; left: 0%;" class="btn btn-outline btn-fav">${heart}</button>                                          
                    </div>
                    <div class="col-6">
                    <h5 class="text-dark" style="position: absolute; bottom: 1%; right: 0%; background: rgba(150, 150, 150, 0.85)">Imdb: ${Math.round(res.results[i].vote_average *10)/10}</h5>
                    </div>  
                  </div>
                </div>
              </div>
            </div>             
          `
          }          
                
        }
        fragment += `</div>`

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
    events.clickOnMovieToDetail();   
    events.btnEventSearch(request);

    });
  });
}

export async function renderMovieDetail(id){ 
  cards = document.querySelector(".cardbody"); 
  cards.innerHTML = "";
  let fragment = ""; 
  let favorites = JSON.parse(localStorage.getItem('fav'));    
 
  api.getMovieDetail(id).then((res) => {   
    console.log(res);
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
   
   let recommendationsString = '';
   let recCount;   
   if(res.similar.results.length <= 4){
    recCount = res.similar.results.length;    
   }   
   else{recCount = 5}
   for(let l = 0; l < recCount; l++) {    
    recommendationsString += `    
      <div class="col d-flex">
        <div class="card rec-card text-bg-dark">
          <img src="${imageBaseUrl}${res.similar.results[l].poster_path}" class="card-img" alt="Recomended movie">
          <div class="card-img-overlay" id="${res.similar.results[l].id}" title="${res.similar.results[l].title}">                                 
          </div>
        </div>
      </div>    
    `;    
   };

   let recTitle;
   let actors;
   let genres;
   if(lang.getCurrentLang() === "en"){
    recTitle = 'Recomended films:';
    actors = 'Actors';
    genres = 'Genres';
   }
   else if(lang.getCurrentLang() === "ru"){
    recTitle = 'Рекомендуемые фильмы:';
    actors = 'В ролях';
    genres = 'Жанры';
   }

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
   if(favorites === null){
    heart = `<i class="fa-regular fa-heart fa-2x"></i>`;    
   }
   else{
      if(!favorites.includes(String(id))){
        heart = `<i class="fa-regular fa-heart fa-2x"></i>`;
      }
      else if(favorites.includes(String(id))){
        heart = `<i class="fa-solid fa-heart fa-2x"></i>`;
      }      
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
                <div class="mr-auto">
                  <button class="btn btn-outline btn-fav">${heart}</button>
                </div>
                <div class="mr-auto ml-auto p-2">
                  <h2 class="card-title mb-2">${res.title}</h2>
                  <h4 class="mb-2" > ${rDate[0]}</h4>
                  <h5 class="mb-3">${genres}: ${genresString}</h5>
                  <h6 class="mb-3">${actors}: ${creditsString}</h6>
                </div> 
                <div class="ml-auto p-3">
                  <h3>Imdb: ${vote}</h3>
                </div>
              </div>                  
              <p class="card-text" style="font-size: 18px">
              ${res.overview}
              </p>               
              <iframe id="ytplayer" type="text/html" width="90%" height="380"
                  src="https://www.youtube.com/embed/${trailer}"
                  frameborder="0"
                  showinfo="0"
                  fs="0"
                  disablekb="0"
                  rel="0">
              </iframe>
              <h5 class="mt-3">${recTitle}</h5>
              <div class="row row-rec mt-4">
                  ${recommendationsString}
              </div>
            </div>            
          </div>          
        </div>
      </div>
    </div>`; 
    
    cards.insertAdjacentHTML("afterbegin", fragment);           
    events.Favorite(id);    
    events.clickRecomendation(); 
    
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
                  <div class="mr-auto">
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
                <iframe id="ytplayer" type="text/html" width="90%" height="380"
                    src="https://www.youtube.com/embed/${trailer}"
                    frameborder="0"
                    showinfo="0"
                    fs="0"
                    disablekb="0"
                    rel="0">
                </iframe>
                <h5 class="mt-3">${recTitle}</h5>
                <div class="row row-rec mt-4">
                    ${recommendationsString}
                </div>
              </div>            
            </div>          
          </div>
        </div>
      </div>`;
      
      cards.insertAdjacentHTML("afterbegin", fragment);      
      events.clickRecomendation();      
      events.Favorite(id);    
    })
   }   
  }) 
}

export function renderFavoriteList(scroll){
  
  cards.innerHTML = "";
  let cardview = false;
  let fragment = "";
  if(localStorage.getItem('viewType') === 'card'){cardview = true}

  if(cardview){
    cards.insertAdjacentHTML('afterbegin', '<div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 text-center mt-1 mb-3 ms-2 me-2 g-2 cards">');
    cards = document.querySelector('.row-cols-2');   
  }
  else{
    fragment = '';
  }

  let favorites = JSON.parse(localStorage.getItem('fav'));

  if(favorites.length !== 0){    
    favorites.forEach((item) => {      
      api.getMovieDetail(item).then((res) => {       
        
        const rDate = res.release_date.split('-');
          const overviewLength = 420;
          let overview = res.overview.slice(0, overviewLength);        
    
          let genresString = '';
          let genresCount = 0;
          res.genres.forEach(genre => {
            genresString += genre.name;
            if(genresCount < res.genres.length -1){
              genresString += ', ';
              genresCount++;
            }
          });         
    
          if(res.overview.length > overviewLength){
            overview += '...'
          }        
  
          let heart = `<i></i>`
          if(!favorites.includes(String(res.id))){        
            heart = `<i class="fa-regular fa-heart fa-2x"></i>`;          
          }
          else if(favorites.includes(String(res.id))){
            heart = `<i class="fa-solid fa-heart fa-2x"></i>`;               
          }
          
          if(!cardview){
            fragment = `<div class="card mb-1" id="${res.id}"
            style="
              max-width: auto;
              border-width: 5px;
              background-color: rgba(22, 21, 21, 0.514);">
            <div class="row row-main g-0">
              <div class="col-md-2">
                <img
                  src="${imageBaseUrl}${res.poster_path}"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-10 text-center ">
                <div class="row">            
                    <div class="card-body ">
                      <div class="d-flex">
                        <div class="mr-auto p-3">
                        <button class="btn btn-outline btn-fav">${heart}</button>
                        </div>
                        <div class="mr-auto ml-auto">
                          <h2 class="card-title mb-2">${res.title}</h2>
                          <h4 class="mb-2" > ${rDate[0]} | ${genresString}</h4>
                        </div> 
                        <div class="ml-auto p-3">
                          <h3>Imdb: ${Math.round(res.vote_average *10)/10}</h3>
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

          else{
            fragment = `
            <div class="col"  id="${res.id}">
              <div class="card text-bg-dark card-main h-100"  >
                <img src="${imageBaseUrl}${res.poster_path}"  class="card-img" alt="...">
                <div class="card-img">                  
                  <div class="row">
                    <div class="col-6">
                      <button style="background: rgba(150, 150, 150, 0.85); position: absolute; bottom: 0%; left: 0%;" class="btn btn-outline btn-fav">${heart}</button>                                          
                    </div>
                    <div class="col-6">
                    <h5 class="text-dark" style="position: absolute; bottom: 1%; right: 0%; background: rgba(150, 150, 150, 0.85)">Imdb: ${Math.round(res.vote_average *10)/10}</h5>
                    </div>  
                  </div>
                </div>
              </div>
            </div>             
          `
          }           
          cards.insertAdjacentHTML("afterbegin", fragment);        
      })
      
    })  
    
    events.clickOnMovieToDetail();       
        window.scrollTo(0, scroll);
  }
  else{    
    if(lang.getCurrentLang() === "en"){
      cards.innerHTML = `<h3 class="no-fav" style="text-align: center;">No favorit films</h3>`;
    }
    else if(lang.getCurrentLang() === "ru"){
      cards.innerHTML = `<h3 class="no-fav" style="text-align: center;">Избранных фильмов еще нету</h3>`;
    }    
  }
    
}

