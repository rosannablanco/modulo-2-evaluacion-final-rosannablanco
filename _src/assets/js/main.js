'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');
const ulSerie = document.querySelector('.js-ul-serie');
const ulFav = document.querySelector('.js-ul-fav');
const paragraph = document.querySelector('.js-paragraph');

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
  paintHtmlResults(resultSeries, ulSerie, classSerie);
}
const numbers = [5, 8, 10];

//function paint results series and favourites
function paintHtmlResults(pArray, pUl, pClase) {
  paragraph.innerHTML = `El número de resultados es:${pArray.length}`;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    if (pArray.length > number) {
      console.log(`El número de resultados es:${pArray.length} y es mayor ${number}`);
    } else {
      console.log(`El número de resultados es:${pArray.length} y es menor ${number}`);
    }
  }
  pUl.innerHTML = '';
  for (const itemSerie of pArray) {
    const liElement = document.createElement('li');
    liElement.setAttribute('class', pClase);
    liElement.setAttribute('data-id', itemSerie.id);
    const titleElement = document.createElement('h4');
    titleElement.setAttribute('class', 'ul__li__title');
    const paragraphElement = document.createElement('p');
    const textTitle = document.createTextNode(itemSerie.name);
    const textParagraph = document.createTextNode(itemSerie.premiered);
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
    paragraphElement.appendChild(textParagraph);
    liElement.appendChild(titleElement);
    liElement.appendChild(paragraphElement);
    liElement.appendChild(imgElement);
    liElement.appendChild(btnFav);
    liElement.appendChild(btnDelete);
    pUl.appendChild(liElement);
    //delete btn add in list fav
    if (pClase === classFav) {
      liElement.removeChild(btnFav);
    }
    btnFav.addEventListener('click', saveSerieFav);
    btnDelete.addEventListener('click', removeFav);
  }
  compareLists();
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

  paintHtmlResults(seriesFav, ulFav, classFav);
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
    }
  }
  let liChild = ulSerie.children;
  for (let li of liChild) {
    let idLiSerie = parseInt(li.dataset.id);
    if (idSelected === idLiSerie) {
      li.classList.remove('class-fav');
    }
  }

  paintHtmlResults(seriesFav, ulFav, classFav);
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
  }
};

//compare lists for paint class fav when on load
function compareLists() {
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

btnElement.addEventListener('click', getDataApi);
getFromSessionStorage();
paintHtmlResults(seriesFav, ulFav, classFav);
