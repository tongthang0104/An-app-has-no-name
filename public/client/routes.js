import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/app';
import Correct from './components/correct';
import Incorrect from './components/incorrect';


export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/correct" component={Correct}/>
    <Route path="/incorrect" component={Incorrect}/>
  </Router>
);
