const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  page: 1,
  fetchCountries(query) {

    const requestParams = `${query}`;

    return fetch(baseUrl + requestParams)
      .then(response => response.json())
      .then(data => data)
      .catch(error => error);
  },
};
