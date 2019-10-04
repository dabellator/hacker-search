import React from 'react';

const SearchBar = ({ searchValue, handleSearch }) => {

  return (
    <span className='searchbar-wrapper'>
      <input onChange={handleSearch} value={searchValue}></input>
    </span>
  )

}

export default SearchBar;
