import React, {Component} from 'react';
import NavBar from './navigation_bar';
import SelectCategory from '../containers/select-category';

class Main extends Component {
  render(){
    return (
      <div>
        <SelectCategory/>
        <NavBar/>
      </div>
    );
  }
}

export default Main;
