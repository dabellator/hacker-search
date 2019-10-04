import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Store from './Store';
import './App.css';
import HackerSearch from './pages/HackerSearch';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Switch>
          <Route path='/' component={HackerSearch} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
