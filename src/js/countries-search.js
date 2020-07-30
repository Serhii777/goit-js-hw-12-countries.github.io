// import coountriesServices from './services/countries-services';
import newService from './services/fetchCountries';
import spinner from './spinner';
import { noticeInfo, noticeError, mySuccess } from './services/notices';

import countriesTemplate from '../templates/countries-template.hbs';
import listCountriesTemplate from '../templates/countries-list-template.hbs';

const _ = require('lodash');

const refs = {
  searchForm: document.querySelector('#search-form'),
  countriesList: document.querySelector('#countries-list'),
  clearButton: document.querySelector('#clear-button'),
};

const inputDelay = _.debounce(searchInputHandler, 500);

refs.searchForm.addEventListener('input', inputDelay);
refs.clearButton.addEventListener('click', resetPage);

function searchInputHandler(event) {
  spinner.show();

  let searchQuery = event.target.value;

  newService
    .fetchCountries(searchQuery)
    .then(data => {
      if (data.length >= 10) {
        spinner.hide();

        if (searchQuery.length <= 1) {
          return noticeInfo();
        }
      } else if (data.length > 2 && data.length < 10) {
        spinner.hide();
        resetPage();
        renderListCountries(data);
      } else {
        spinner.hide();
        resetPage();
        renderCountriesRows(data);
        mySuccess();
      }
    })
    .catch(error => {
      noticeError();
      resetPage();
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
