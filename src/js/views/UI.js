import * as api from "../services/TmdbService";
import * as events from "./events";

const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
let cards = document.querySelector(".cardbody");

export function renderMostPopular(page) {
  cards.innerHTML = "";
  let fragment = "";
  api.getMostPopular(page).then((res) => {
    
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
                      <h1 class="card-title mb-3">${res.results[i].title}</h1>
                      <h3 class="mb-3" style="color: #F7943C">Imdb: ${res.results[i].vote_average}</h3>
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
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              
              <li class="page-item active" aria-current="page">
                <span class="page-link currentpage">${currentPage}</span>
              </li>              
              
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>`;
    }
    cards.insertAdjacentHTML("afterbegin", fragment);
    events.btnEventPopular();
  });
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
