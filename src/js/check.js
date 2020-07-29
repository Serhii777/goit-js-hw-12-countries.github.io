import coountriesServices from './services/countries-services';
import newRowTemplate from '../templates/countries-template.hbs';

const countriesRef = document.querySelector('#countries-list');

const baseUrl = 'https://restcountries.eu/rest/v2/name/';
const nameCountries = 'sudan';
// const fullNameCountries = '&fullText=true';

// fetch('https://restcountries.eu/rest/v2/name/')
fetch(baseUrl + nameCountries)
  .then(response => {
    //* response handling
    console.log(response);
    return response.json();
  })
  .then(data => {
    //* data handling
    console.log(data[0]);
    console.dir(data[0]);
    renderCountriesRows(data);
  })
  .catch(error => {
    //* error handling
    console.log(error);
  });

function renderCountriesRows(countries) {
  const markup = countries.map(countries => newRowTemplate(countries)).join('');
  // console.log(markup);

  countriesRef.insertAdjacentHTML('beforeend', markup);
}
