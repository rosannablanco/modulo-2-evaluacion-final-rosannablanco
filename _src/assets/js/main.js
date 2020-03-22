'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');
const ulSerie = document.querySelector('.js-ul-serie');
const ulFav = document.querySelector('.js-ul-fav');

//arrays results series search serie
let resultSeries = new Array();
//arrays results fav serie
let seriesFav = new Array();

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
  paintResultSeries(resultSeries, ulSerie);
}

//function paint results series
function paintResultSeries(pArray, pUl) {
  pUl.innerHTML = '';
  for (const itemSerie of pArray) {
    const liElement = document.createElement('li');
    liElement.setAttribute('class', 'ul__li js-li-serie');
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
    const btnFav = document.createElement('button');
    btnFav.setAttribute('class', 'ul__li__btn btn add');
    const contentBtnFav = document.createTextNode('Añadir fav');

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('class', 'ul__li__btn btn delete');
    const contentBtnDelete = document.createTextNode('Borrar fav');

    btnFav.appendChild(contentBtnFav);
    btnDelete.appendChild(contentBtnDelete);
    titleElement.appendChild(textTitle);
    liElement.appendChild(titleElement);
    liElement.appendChild(imgElement);
    liElement.appendChild(btnFav);
    liElement.appendChild(btnDelete);
    pUl.appendChild(liElement);
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

  console.log(idSelected);
  console.log(resultSeries);
  for (const itemSerie of resultSeries) {
    if (idSelected === itemSerie.id) {
      favourite = itemSerie;
    }
  }
  seriesFav.push(favourite);
  paintResultSeriesFav();
  setInSessionStorage();
}
//function paint resultados favoritos
function paintResultSeriesFav() {
  ulFav.innerHTML = '';
  for (const itemSerie of seriesFav) {
    const liElement = document.createElement('li');
    liElement.setAttribute('class', 'ul__li js-li-serie');
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

    btnDelete.appendChild(contentBtnDelete);
    titleElement.appendChild(textTitle);
    liElement.appendChild(titleElement);
    liElement.appendChild(imgElement);
    liElement.appendChild(btnDelete);
    ulFav.appendChild(liElement);
    btnDelete.addEventListener('click', removeFav);
  }
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
  paintResultSeriesFav();
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
    paintResultSeriesFav();
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
      console.log(idLi);
    }
  }
}
btnElement.addEventListener('click', getDataApi);
getFromSessionStorage();
