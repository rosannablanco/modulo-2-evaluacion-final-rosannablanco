'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');
const ulFav = document.querySelector('.js-ul-fav');
const ulSerie = document.querySelector('.js-ul-serie');

//arrays results search serie
let dataSerieResult = new Array();
//arrays results fav serie
let serieFavResult = new Array();

//function get data API
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
  ulSerie.innerHTML = '';
  for (const itemSerie of dataSerieResult) {
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'ul__li js-li-serie');
    liElement.setAttribute('data-id', itemSerie.id);
    let titleElement = document.createElement('h4');
    titleElement.setAttribute('class', 'ul__li__title');
    let textTitle = document.createTextNode(itemSerie.name);
    let imgElement = document.createElement('img');
    imgElement.setAttribute('class', 'ul__li__img');
    if (itemSerie.image === null) {
      imgElement.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
    } else {
      imgElement.setAttribute('src', itemSerie.image.medium);
    }
    titleElement.appendChild(textTitle);
    liElement.appendChild(titleElement);
    liElement.appendChild(imgElement);
    ulSerie.appendChild(liElement);
    liElement.addEventListener('click', saveSerieFav);
  }
  /* let liElements = document.querySelectorAll('.js-li-serie');
  for (const liSerie of liElements) {
    liSerie.addEventListener('click', saveSerieFav);
  } */
}

//
function saveSerieFav(ev) {
  let liSelected = ev.currentTarget;
  liSelected.classList.add('class-fav');
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
    liElement.setAttribute('class', 'ul__li js-list-fav js-li-fav');
    liElement.setAttribute('data-id', itemFav.id);
    let titleElement = document.createElement('h4');
    titleElement.setAttribute('class', 'ul__li__title');
    let textTitle = document.createTextNode(itemFav.name);
    let imgElement = document.createElement('img');
    imgElement.setAttribute('class', 'ul__li__img js-img');
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
  const parentElement = liSelected.parentElement;
  for (let i = 0; i < serieFavResult.length; i++) {
    if (idLiSelected === serieFavResult[i].id) {
      serieFavResult.splice(i, 1);
      parentElement.removeChild(liSelected);
    }
  }
  /* paintFavList(); */
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
