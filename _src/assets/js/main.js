'use strict';
// global variables
const inputElement = document.querySelector('.js-input');
const btnElement = document.querySelector('.js-btn');

fetch('http://api.tvmaze.com/search/shows?q=girls')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

function getData() {
  // eslint-disable-next-line no-console
  console.log(inputElement.value);
}

btnElement.addEventListener('click', getData);
