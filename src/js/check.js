import newRowTemplate from '../templates/countries-template.hbs';
const countriesRef = document.querySelector('#countries-list');

fetch('https://restcountries.eu/rest/v2/name/switzerland')
  .then(response => {
    //* response handling
    console.log(response);
    return response.json();
  })
  .then(data => {
    //* data handling
    console.log(data);
    // console.log(data.items);
    console.dir(data);
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
