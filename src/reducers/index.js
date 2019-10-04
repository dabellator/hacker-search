import { combineReducers } from 'redux';
import { searchResults } from './searchResults';

const appReducer = combineReducers({ searchResults });

export default (state, action) => appReducer(state, action);
