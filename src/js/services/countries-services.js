// 'https://restcountries.eu/rest/v2/name/{name}';
const baseUrl = 'https://restcountries.eu/rest/v2/name/';
// const variable = `${query}`;

export default {
  page: 1,
  inputValue: '',
  fetchArticles() {
    // const options = {
    //   headers: {
    //     Authorization: '84ab7c17f8f14edf9a0f2b7ee9d89cf1',
    //   },
    // };

    // const requestParams = `/${this.inputValue}&page=${this.page}&pageSize=10`;
    const requestParams = `/${this.inputValue}`;
    // console.log(inputValue);
    

    return (
      fetch(baseUrl + requestParams, options) //* то, что возвратит БЕ
        .then(response => response.json()) //* то,что возвратит Ф. внутри
        //? т.е. fetchArticles теперь возвращает промис, и мы можем перенести
        //? then(data) в файл news-search.js в Ф. searchFormSubmitHandler
        .then(data => {
          // this.incrementPage(); //* вызываем пагинацию
          return data[0];
        })
      //* но возьмем тут только articles, а не весь Об.
    );
  },

  get searchQuery() {
    return this.inputValue;
  },

  set searchQuery(string) {
    this.inputValue = string;
  },

  // incrementPage() {
  //   //* делаем Мт. для пагинации
  //   this.page += 1;
  // },

  resetPage() {
    this.page = 1;
  },
};
