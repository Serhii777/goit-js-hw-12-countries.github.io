// import coountriesServices from './services/countries-services';
import countriesTemplate from '../templates/countries-template.hbs';
import listCountriesTemplate from '../templates/countries-list-template.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';
const _ = require('lodash');

const refs = {
  input: document.querySelector('#search-input'),
  countriesList: document.querySelector('#countries-list'),
  countriesItem: document.getElementsByClassName('.card'),
  clearButton: document.querySelector('#clear-button'),
};

const inputDelay = _.debounce(searchInputHandler, 1000);

refs.input.addEventListener('input', inputDelay);
refs.clearButton.addEventListener('click', resetPage);

function searchInputHandler(event) {
  let inputValue = event.target.value;

  fetch(baseUrl + inputValue)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);

      if (data.length >= 10) {
        console.log('Сделай запрос более специфичным');
        notice();
      } else if (data.length > 2 && data.length < 10) {
        console.log('Покажи список стран');
        renderListCountries(data);
      } else {
        renderCountriesRows(data);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function notice() {
  PNotify.alert({
    title: 'Alert',
    text: 'Too many matches found. Please enter a more specific query!',
    width: 'auto',
    type: 'info',
  });
}

function renderListCountries(countries) {
  const markup = countries
    .map(countries => listCountriesTemplate(countries))
    .join('');

  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function renderCountriesRows(countries) {
  const markup = countries
    .map(countries => countriesTemplate(countries))
    .join('');

  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function resetPage() {
  refs.countriesList.innerHTML = '';
}
