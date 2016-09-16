import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, browserHistory } from 'react-router';
import question from './reducers';
import routes from './routes';
import promise from 'redux-promise';
//import App from './components/stuff'
// const createStoreWithMiddleware = applyMiddleware(
//   promise )(createStore);

 let store = createStore(question);
//add     <App /> between provider
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('container'));
