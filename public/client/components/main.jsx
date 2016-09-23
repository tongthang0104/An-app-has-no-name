import React, {Component} from 'react';
import CreateRoom from './navigation_bar';


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

        <input type="text" placeholder="Enter username" onKeyUp={this.addUser}></input>
        <CreateRoom />
        <button>Join</button>
      </div>
    );
  }
}

export default Main;
