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

const inputDelay = _.debounce(searchInputHandler, 500);

refs.input.addEventListener('input', inputDelay);
refs.clearButton.addEventListener('click', resetPage);

function searchInputHandler(event) {
  spinner.show();
  let inputValue = event.target.value;

  fetch(baseUrl + inputValue)
    .then(response => {
      return response.json();
    })
    .then(data => {

      if (data.length >= 10) {
        spinner.hide();
        console.log('Сделай запрос более специфичным');
        notice();
      } else if (data.length > 2 && data.length < 10) {
        spinner.hide();
        console.log('Покажи список стран');
        refs.countriesList.innerHTML = '';
        renderListCountries(data);
      } else {
        spinner.hide();
        console.log('Сделай карточку страны');
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
    delay: 1500,
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
  const markupList = countries
    .map(countries => listCountriesTemplate(countries))
    .join('');

  refs.countriesList.insertAdjacentHTML('beforeend', markupList);
}

function renderCountriesRows(countries) {
  const markupCard = countries
    .map(countries => countriesTemplate(countries))
    .join('');

  refs.countriesList.insertAdjacentHTML('beforeend', markupCard);
}

function resetPage() {
  refs.countriesList.innerHTML = '';
}
