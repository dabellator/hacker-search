import axios from 'axios';

export const getSearchResults = (searchValue, page = 0) => {
  searchValue = encodeURI(searchValue);

  return dispatch => {
    if (!searchValue) return dispatch({ type: 'UPDATE_SEARCH_RESULTS', results: [] })
    return axios.get(`http://hn.algolia.com/api/v1/search?query=${searchValue}&hitsPerPage=200&page=${page}`)
      .then(res => {
        dispatch({ type: 'UPDATE_SEARCH_RESULTS', results: res.data.hits })
      })
  }
};

export const getNextSearchResults = (searchValue, page = 0) => {
  searchValue = encodeURI(searchValue);

  return dispatch => {
    return axios.get(`http://hn.algolia.com/api/v1/search?query=${searchValue}&hitsPerPage=200&page=${page}`)
      .then(res => {
        dispatch({ type: 'ADD_SEARCH_RESULTS', results: res.data.hits })
      })
  }
};
