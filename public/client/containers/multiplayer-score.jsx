import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { changeScore } from '../actions/index';
import Socket from '../socket';

export default class MultiplayerScore extends Component {
  constructor(props){
    super(props);
    this.state = {
      score: 0,
      player2name: 'Player 2',
    };
  }

componentDidMount(){
  // Socket.on('broadcastScore', (data) => {
  //   console.log("in broadcast score", data)
  //   this.setState({score: data.score}).bind(this);
  // });

  Socket.on('gotUserInfo', (data) => {
    // console.log("in gotUserInfo score", data)
    this.setState({player2name:data.username})
  });
  Socket.on('broadcastScore', (data) => {
    console.log("in broadcast score", data)
    this.setState({score: data.score});
  });
}



  render() {
    // console.log('this.state.player2name', this.state.player2name);
    return (
      <div className="multiplayerScore">
        <div className="panel panel-default">
          <div className="panel-heading">{this.state.player2name}'s Score</div>
          <div className="panel-body">
            {this.state.score}
          </div>
        </div>
      </div>
    );
  }
}
