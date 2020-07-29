// import coountriesServices from './services/countries-services';
import countriesTemplate from '../templates/countries-template.hbs';
import listCountriesTemplate from '../templates/countries-list-template.hbs';
import spinner from './spinner';

import '../sass/styles.scss';
import { error, alert, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

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
// const inputListener = refs.input.addEventListener('input', inputDelay);
refs.clearButton.addEventListener('click', resetPage);

function searchInputHandler(event) {
  spinner.show();
  let inputValue = event.target.value;

  fetch(baseUrl + inputValue)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);

      if (data.length >= 10) {
        spinner.hide();
        console.log('Сделай запрос более специфичным');

        notice();
      } else if (data.length > 2 && data.length < 10) {
        spinner.hide();
        refs.countriesList.innerHTML = '';
        console.log('Покажи список стран');

        renderListCountries(data);
      } else {
        spinner.hide();
        refs.countriesList.innerHTML = '';
        renderCountriesRows(data);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function notice() {
  error({
    title: 'Attention!!!',
    text: 'Too many matches found. Please enter a more specific query!',
    width: '300px',
    type: 'error',
    delay: 5000,
    remove: true,
    modal: true,
    overlayClose: true,
    context: refs.input,
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: 'Ok',
              primary: true,
              click: notice => {
                notice.close();
              },
            },
          ],
        },
      ],
    ]),
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
