import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import App from './components/app';
import Correct from './components/correct';
import Incorrect from './components/incorrect';
import Categories from './containers/categories';



export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <IndexRoute component={Categories} />
    <Route path="/correct" component={Correct}/>
    <Route path="/incorrect" component={Incorrect}/>
  </Router>
);
