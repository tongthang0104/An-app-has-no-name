'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import routes from './routes';
import { AUTH_USER } from './constants/index';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const user = JSON.parse(localStorage.getItem('username'));
const token = JSON.parse(localStorage.getItem('user'));

if (user && token) {
  store.dispatch({ type: AUTH_USER, payload: { username: user } });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('container')
)
