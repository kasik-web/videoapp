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
