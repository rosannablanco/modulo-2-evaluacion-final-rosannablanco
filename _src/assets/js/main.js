'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');

fetch('http://api.tvmaze.com/search/shows?q=girls')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i].show;
      console.log(element);
    }
  });

function getData() {
  // eslint-disable-next-line no-console
  console.log(inputElement.value);
}

btnElement.addEventListener('click', getData);
