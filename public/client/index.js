import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import profile from './reducers'
import App from './components/stuff'

let store = createStore(profile)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
)
