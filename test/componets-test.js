import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Header from '../public/client/components/header';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';

const middlewares = [thunk]; 
const mockStore = configureStore(middlewares);

describe('<Header />', () => {
  const initialState = {}
  const store = mockStore(initialState)
  const props = {
   loginStatus:null,
   signupStatus:null,
   dispatch: () => {}
 }
 const wrapper = mount(<Provider store={store}><Header /></Provider>);

  it('allows us to set props', () => {
    expect(
      wrapper.find('div')
    )
  });

  after(function() {
    global.window.close();
  });
});
