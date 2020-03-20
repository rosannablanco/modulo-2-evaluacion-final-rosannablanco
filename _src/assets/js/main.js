'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');

function getDataApi() {
  const inputElementValue = inputElement.value;
  fetch('http://api.tvmaze.com/search/shows?q=' + inputElementValue)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const dataShow = data[i].show;
        saveResult(dataShow);
      }
    });
  // eslint-disable-next-line no-console
}

//function save result data API
function saveResult(pDataShow) {
  console.log(pDataShow);
}

btnElement.addEventListener('click', getDataApi);
