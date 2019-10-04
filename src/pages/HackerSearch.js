import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSearchResults, getNextSearchResults } from '../actions/hacker';
import SearchBar from '../components/SearchBar';
import List from '../components/List';
import InfiniteScroll from '../components/InfiniteScroll';

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(null, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (immediate && !timeout) func.apply(null, args);
  };
};

const HackerSearch = ({ searchResults, getSearchResults, getNextSearchResults }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [shouldListen, setShouldListen] = useState(true);

  const debounceSearch = debounce(getSearchResults, 500);

  const handleSearchInput = e => {
    if (currentPage !== 0) setCurrentPage(0);
    setSearchValue(e.target.value);
    debounceSearch(e.target.value);
  }

  const getNextResults = () => {
    getNextSearchResults(searchValue, currentPage + 1)
    setCurrentPage(currentPage + 1);
    setShouldListen(false);
  }

  if((searchResults.length) === (currentPage + 1) * 200 && !shouldListen) setShouldListen(true);

  return (
    <div className='main-wrapper'>
      <SearchBar handleSearch={handleSearchInput} searchValue={searchValue} />
      <InfiniteScroll shouldListen={shouldListen} handleAction={getNextResults}>
        <List items={searchResults} />
      </InfiniteScroll>
    </div>
  )
}

const mapStateToProps = state => ({
  searchResults: state.searchResults.results
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getSearchResults,
    getNextSearchResults
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(HackerSearch);
