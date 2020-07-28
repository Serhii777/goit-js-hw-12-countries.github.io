import coountriesServices from './services/countries-services';
const _ = require('lodash');

const refs = {
  // searchForm: document.querySelector('#search-form'),
  input: document.querySelector('#search-input'),
  countriesList: document.querySelector('#countries-list'),
};

const input = refs.input.addEventListener('input', serachInputHandler);
// console.log(input);

console.log('Starting app');
console.log(_.isString(true));
console.log(_.isString('Saurabh'));

function serachInputHandler(event) {
  // _.debounce(console.log(event), 500);
  // event.preventDafault();
  // console.log(event.currentTarget);
  console.log(event.target.value);
  let inputValue = event.target.value;
  // console.log(inputValue);

  // inputValue = inputValue.replace(' ', '').toLowerCase();
  // console.log(inputValue);

  // const input = event.currentTarget.elements.query;
  // console.log(input);

  coountriesServices.serchQuery = event.target.value;

  fetch(coountriesServices)
    .then(response => {
      //* response handling
      console.log(response);
      return response.json();
    })
    .then(data => {
      //* data handling
      console.log(data);
    })
    .catch(error => {
      //* error handling
      console.log(error);
    });
}
