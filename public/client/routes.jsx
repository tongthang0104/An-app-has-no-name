import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import App from './components/app';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} ></Route>
  </Router>
);
