import React from 'react';
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

class HackerSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0,
      searchValue: '',
      shouldListen: true
    }

    this.debounceSearch = debounce(props.getSearchResults, 500)
  }

  componentDidUpdate() {
    if((this.props.searchResults.length) === (this.state.currentPage + 1) * 200 && !this.state.shouldListen) {
      this.setState({ shouldListen: true });
    }
  }

  handleSearchInput = e => {
    if (this.state.currentPage !== 0) this.setState({ currentPage: 0 });
    this.setState({ searchValue: e.target.value });
    this.debounceSearch(e.target.value);
  }

  getNextResults = () => {
    this.props.getNextSearchResults(this.state.searchValue, this.state.currentPage + 1)
    this.setState({ currentPage: this.state.currentPage + 1, shouldListen: false});
  }
  
  render() {
    return (
      <div className='main-wrapper'>
        <SearchBar handleSearch={this.handleSearchInput} searchValue={this.state.searchValue} />
        <InfiniteScroll shouldListen={this.state.shouldListen} handleAction={this.getNextResults}>
          <List items={this.props.searchResults} />
        </InfiniteScroll>
      </div>
    )
  }
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
