import React, {Component} from 'react';
import NavBar from './navigation_bar';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';


class Main extends Component {
  render(){
    return (
      <NavBar />
    );
  }
}

export default Main;
