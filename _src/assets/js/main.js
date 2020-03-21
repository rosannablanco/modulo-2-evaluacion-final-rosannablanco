'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');
const ulElement = document.querySelector('.js-ul-movie');
const ulFav = document.querySelector('.js-ul-fav');

//arrays results search serie
let dataSerieResult = new Array();
//arrays results fav serie
let serieFavResult = new Array();

function getDataApi() {
  const inputElementValue = inputElement.value;
  fetch('http://api.tvmaze.com/search/shows?q=' + inputElementValue)
    .then(response => response.json())
    .then(data => {
      saveDataShow(data);
    });
  /* .catch(error => console.log(`Ha sucedido un error: ${error}`)); */
}

function saveDataShow(pData) {
  dataSerieResult = [];
  for (let i = 0; i < pData.length; i++) {
    let data = pData[i].show;
    dataSerieResult.push(data);
  }
  paintResultShow();
}
function paintResultShow() {
  ulElement.innerHTML = '';
  for (const itemSerie of dataSerieResult) {
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'page__main__conatiner__ul__li js-li-movie');
    liElement.setAttribute('data-id', itemSerie.id);
    let titleElement = document.createElement('h2');
    let textTitle = document.createTextNode(itemSerie.name);
    let imgElement = document.createElement('img');
    if (itemSerie.image === null) {
      imgElement.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
    } else {
      imgElement.setAttribute('src', itemSerie.image.medium);
    }
    titleElement.appendChild(textTitle);
    liElement.appendChild(titleElement);
    liElement.appendChild(imgElement);
    ulElement.appendChild(liElement);
  }
  let liElements = document.querySelectorAll('.js-li-movie');
  for (const liSerie of liElements) {
    liSerie.addEventListener('click', saveSerieFav);
  }
}

//
function saveSerieFav(ev) {
  let liSelected = ev.currentTarget;
  let idLiSelected = parseInt(liSelected.dataset.id);
  let elementSerie;
  for (const itemSerie of dataSerieResult) {
    if (idLiSelected === itemSerie.id) {
      elementSerie = itemSerie;
    }
  }
  serieFavResult.push(elementSerie);
  paintFavList();
  setInSessionStorage();
}
function paintFavList() {
  ulFav.innerHTML = '';
  for (let itemFav of serieFavResult) {
    let liElement = document.createElement('li');
    /* liElement.setAttribute('class', 'page__main__conatiner__ul__li js-li-movie' );*/
    liElement.setAttribute('data-id', itemFav.id);
    let titleElement = document.createElement('h2');
    let textTitle = document.createTextNode(itemFav.name);
    let imgElement = document.createElement('img');
    imgElement.setAttribute('class', 'js-li-fav');
    if (itemFav.image === null) {
      imgElement.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
    } else {
      imgElement.setAttribute('src', itemFav.image.medium);
    }
    titleElement.appendChild(textTitle);
    liElement.appendChild(titleElement);
    liElement.appendChild(imgElement);
    ulFav.appendChild(liElement);
    liElement.addEventListener('click', removeFav);
  }
}
//function remove Fav
function removeFav(ev) {
  let liSelected = ev.currentTarget;
  let idLiSelected = parseInt(liSelected.dataset.id);
  for (const itemFav of serieFavResult) {
    if (idLiSelected === itemFav.id) {
      serieFavResult.splice(itemFav, 1);
    }
  }
  paintFavList();
  setInSessionStorage();
}
//function save in sessionStorage
function setInSessionStorage() {
  const stringifyFav = JSON.stringify(serieFavResult);
  sessionStorage.setItem('serieFavResult', stringifyFav);
}

// session storage
const getFromSessionStorage = () => {
  const localStorageFav = sessionStorage.getItem('serieFavResult');
  if (localStorageFav !== null) {
    serieFavResult = JSON.parse(localStorageFav);
    paintFavList();
  }
};

btnElement.addEventListener('click', getDataApi);
getFromSessionStorage();
