
let language;

if(localStorage.getItem('lang') === null){
    localStorage.setItem('lang', 'en');
    language = 'en'
}
else{
    language = localStorage.getItem('lang');
}

function setCurrentLang(lang){
    language = lang;
    localStorage.setItem('lang', lang);
    location.reload();
}

export function getCurrentLang(){
    return language;
}

export function langSelect(){
    langEn();
    langRu();
    translateUiElements();
  }
  
  function langEn(){
    const langSelector = document.querySelector('.dropdown-item-en');  
    langSelector.addEventListener('click', (e) => {
      e.preventDefault();
      setCurrentLang('en');      
    }) 
  }
  
  function langRu(){
    const langSelector = document.querySelector('.dropdown-item-ru');  
    langSelector.addEventListener('click', (e) => {
      e.preventDefault();
      setCurrentLang('ru');   
    }) 
  }

  function translateUiElements(){    
    const btnFavorite = document.querySelector('#btnFavorite');
    const btnHome = document.querySelector('.home');
    const btnSearch = document.querySelector(".btnsearch");       
    const btnUp = document.querySelector('#btn-up');

    if(language === 'en'){
      btnFavorite.innerHTML = 'Favorite Films';
      btnHome.innerHTML = 'Home';
      btnSearch.innerHTML = 'Search';      
      btnUp.title = 'Up';
    }
    else if(language === 'ru'){
      btnFavorite.innerHTML = 'Избранные фильмы';
      btnHome.innerHTML = 'Главная';
      btnSearch.innerHTML = 'Поиск';      
      btnUp.title = 'Вверх';
    }      
  }



