import update from 'immutability-helper';

const initialState = {
  results: []
}

export const searchResults = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SEARCH_RESULTS':
      return update(state, {
        results: {$set: action.results}
      })
    case 'ADD_SEARCH_RESULTS':
      return update(state, {
        results: {$push: action.results}
      })
    
    default:
      return state;
  }
}
