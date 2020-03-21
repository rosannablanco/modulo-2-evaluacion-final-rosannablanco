'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');
const ulElement = document.querySelector('.js-ul-movie');

//arrays results search serie
let dataSerieResult = new Array();

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
  paintResultShow(dataSerieResult);
}
function paintResultShow(pDataSerieResult) {
  ulElement.innerHTML = '';
  for (const itemSerie of pDataSerieResult) {
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'page__main__conatiner__ul__li js-ul-movie');
    let titleElement = document.createElement('h2');
    let textTitle = document.createTextNode(itemSerie.name);
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', itemSerie.image.medium);
    titleElement.appendChild(textTitle);
    liElement.appendChild(titleElement);
    liElement.appendChild(imgElement);
    ulElement.appendChild(liElement);
  }
}

btnElement.addEventListener('click', getDataApi);
