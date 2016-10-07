import React, { Component }  from 'react';
import QuestionList from '../containers/question-list';
import Score from '../containers/score';
import MultiplayerScore from '../containers/multiplayer-score';
import Socket from '../socket';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {  saveUserInfo } from '../actions/index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      username: localStorage.getItem('username'),
    };
  }

  componentWillMount() {
    Socket.on('receiveMultiplayerQuestions', (data) => {
      this.setState({roomId: data.roomId});
      this.props.saveUserInfo(this.state.username, data.roomId)
    });
    // console.log('Username from joinRoom: ', this.state.username);
  }
  renderScore() {
    // console.log('this.props.userInfo', this.props.userInfo);
    if (this.state.roomId) {
      // console.log('Multiplayer', this.state.roomId)
      return (
        <table  className="Score-Table" >
          <td className="Right-Score">
            <Score />
          </td>
          <td className="Left-Score">
            <MultiplayerScore />
          </td>
        </table>
      );
    } else {
      return (
        <div className="Center-Score">
          <Score />
        </div>
      );
    }
  }

  render(){
    return (
      <div className="wrap">
        {this.props.children}
        {this.renderScore()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    userInfo: state.UserInfoReducer,
  };
}


export default connect(mapStateToProps, { saveUserInfo})(App);


