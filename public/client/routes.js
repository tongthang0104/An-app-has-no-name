import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/stuff';
import Question from './components/question';

const Hi = () => {
  return <div>Whatup</div>
}

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/question" component={Question} />
  </Router>
);
