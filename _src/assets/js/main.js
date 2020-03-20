'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');
const ulElement = document.querySelector('.js-ul-movie');
//arrays results
let dataShowResult = new Array();

function getDataApi() {
  const inputElementValue = inputElement.value;
  fetch('http://api.tvmaze.com/search/shows?q=' + inputElementValue)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        dataShowResult = data[i].show;
        saveResult();
      }
    });
  /* .catch(error => console.log(`Ha sucedido un error: ${error}`)); */
}

//function save result data API
function saveResult() {
  paintResultShow();
}
function paintResultShow() {
  let liElement = document.createElement('li');
  liElement.setAttribute('class', 'page__main__conatiner__ul__li js-ul-movie');
  let titleElement = document.createElement('h2');
  let textTitle = document.createTextNode(dataShowResult.name);
  let imgElement = document.createElement('img');
  if (dataShowResult.image.medium !== '') {
    imgElement.setAttribute('src', dataShowResult.image.medium);
  } else {
    imgElement.setAttribute('src', 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV');
  }
  titleElement.appendChild(textTitle);
  liElement.appendChild(titleElement);
  liElement.appendChild(imgElement);
  ulElement.appendChild(liElement);
  // eslint-disable-next-line no-console
  console.log(dataShowResult);
}

btnElement.addEventListener('click', getDataApi);
