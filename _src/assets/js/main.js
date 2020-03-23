'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');
const ulSerie = document.querySelector('.js-ul-serie');
const ulFav = document.querySelector('.js-ul-fav');

//arrays results series y fav serie
let resultSeries = new Array();
let seriesFav = new Array();

//const class of the li element serie and favourite
const classSerie = 'ul__li js-li-serie';
const classFav = 'ul__li js-li-ul-fav';

//function get data API
function getDataApi() {
  const inputElementValue = inputElement.value;
  fetch('http://api.tvmaze.com/search/shows?q=' + inputElementValue)
    .then(response => response.json())
    .then(data => {
      saveDataShow(data);
    });
}

//Save data show api
//in array resultSeries with only the data show
function saveDataShow(pData) {
  ulSerie.innerHTML = '';
  resultSeries = [];
  for (let i = 0; i < pData.length; i++) {
    let data = pData[i].show;
    resultSeries.push(data);
  }
  paintResultSeries(resultSeries, ulSerie, classSerie);
}

//function paint results series
function paintResultSeries(pArray, pUl, pClase) {
  pUl.innerHTML = '';
  for (const itemSerie of pArray) {
    const liElement = document.createElement('li');
    liElement.setAttribute('class', pClase);
    liElement.setAttribute('data-id', itemSerie.id);
    const titleElement = document.createElement('h4');
    titleElement.setAttribute('class', 'ul__li__title');
    const textTitle = document.createTextNode(itemSerie.name);
    const imgElement = document.createElement('img');
    imgElement.setAttribute('class', 'ul__li__img');
    if (itemSerie.image === null) {
      imgElement.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
    } else {
      imgElement.setAttribute('src', itemSerie.image.medium);
    }

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('class', 'ul__li__btn btn delete');
    const contentBtnDelete = document.createTextNode('Borrar fav');

    const btnFav = document.createElement('button');
    btnFav.setAttribute('class', 'ul__li__btn btn add');
    const contentBtnFav = document.createTextNode('Añadir fav');
    btnFav.appendChild(contentBtnFav);

    btnDelete.appendChild(contentBtnDelete);
    titleElement.appendChild(textTitle);
    liElement.appendChild(titleElement);
    liElement.appendChild(imgElement);
    liElement.appendChild(btnFav);
    liElement.appendChild(btnDelete);
    pUl.appendChild(liElement);
    if (pClase === classFav) {
      liElement.removeChild(btnFav);
      btnDelete.addEventListener('click', eliminarFavStyle);
    }
    btnFav.addEventListener('click', saveSerieFav);
    btnDelete.addEventListener('click', removeFav);
  }
  compararListado();
}

//function save favourite
function saveSerieFav(ev) {
  const btnSelect = ev.currentTarget;
  const liSelected = btnSelect.parentElement;
  liSelected.classList.add('class-fav');
  const idSelected = parseInt(liSelected.dataset.id);
  let favourite;
  for (const itemSerie of resultSeries) {
    if (idSelected === itemSerie.id) {
      favourite = itemSerie;
    }
  }

  seriesFav.push(favourite);
  paintResultSeries(seriesFav, ulFav, classFav);
  setInSessionStorage();
}

//function remove Fav
function removeFav(ev) {
  const btnSelected = ev.currentTarget;
  const parentElement = btnSelected.parentElement;
  let idSelected = parseInt(parentElement.dataset.id);

  for (let i = 0; i < seriesFav.length; i++) {
    if (idSelected === seriesFav[i].id) {
      seriesFav.splice(i, 1);
      parentElement.remove;
    }
  }
  parentElement.classList.remove('class-fav');
  console.log(parentElement);
  paintResultSeries(seriesFav, ulFav, classFav);
  setInSessionStorage();
}

//function save in sessionStorage
function setInSessionStorage() {
  const stringifyFav = JSON.stringify(seriesFav);
  sessionStorage.setItem('seriesFav', stringifyFav);
}
//function get fav in sessionStorage
const getFromSessionStorage = () => {
  const sessionStorageFav = sessionStorage.getItem('seriesFav');
  if (sessionStorageFav !== null) {
    seriesFav = JSON.parse(sessionStorageFav);
    paintResultSeries(seriesFav, ulFav, classFav);
  }
};

//comparar listados
function compararListado() {
  if (seriesFav !== null) {
    let liSerie = ulSerie.querySelectorAll('.js-li-serie');
    for (let li of liSerie) {
      const idLi = parseInt(li.dataset.id);
      for (const fav of seriesFav) {
        let idFav = fav.id;
        if (idLi === idFav) {
          li.classList.add('class-fav');
        }
      }
    }
  }
}
function eliminarFavStyle() {
  if (seriesFav !== null) {
    let liSerie = ulSerie.querySelectorAll('.js-li-serie');
    for (let li of liSerie) {
      const idLi = parseInt(li.dataset.id);
      for (const fav of seriesFav) {
        let idFav = fav.id;
        if (idLi === idFav) {
          li.classList.remove('class-fav');
        }
      }
    }
  }
}
btnElement.addEventListener('click', getDataApi);
getFromSessionStorage();
