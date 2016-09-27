import React, {Component} from 'react';
import CreateRoom from './navigation_bar';
import RandamCategories from './random_categories';
import SelectCategories from '../containers/select-category';
import Login from './auth';

class Main extends Component {

  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
  }
  
  addUser(e) {
    const user = {
      username: e.target.value
    };
  }

  render(){
    return (
      <div>
        <Login />
        <SelectCategories />
        <RandamCategories />
        <input type="text" placeholder="Enter username" onKeyUp={this.addUser} />
        <CreateRoom />
        <button>Join</button>
      </div>
    );
  }
}

export default Main;
