'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');

//
let dataShow = new Array();

function getDataApi() {
  const inputElementValue = inputElement.value;
  fetch('http://api.tvmaze.com/search/shows?q=' + inputElementValue)
    .then(response => response.json())
    .then(data => {
      saveDataShow(data);
    });
  // eslint-disable-next-line no-console
}

//function save result data API
function saveDataShow(pData) {
  for (let i = 0; i < pData.length; i++) {
    let data = pData[i].show;
    dataShow.push(data);
  }
  /*  console.log(dataShow); */
}

btnElement.addEventListener('click', getDataApi);
