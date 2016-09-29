import React, { Component }  from 'react';
import QuestionList from '../containers/question-list';
import Score from '../containers/score';
import MultiplayerScore from '../containers/multiplayer-score';
import Socket from '../socket';
import { withRouter } from 'react-router';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      unsaved: false,
    };
  }

  componentWillMount() {
    Socket.on('receiveMultiplayerQuestions', (data) => {
      console.log("roomID in QuestionList", data.roomId);
      this.setState({roomId: data.roomId});
    });

  }

  addUser() {
    const user = {
      username: socket.id
    }
  }

  handleSubmit(e) {
    const body = e.target.value;

    if (e.keyCode === 13 && body) {
      const message = {
        body,
        room: this.state.room
      }
      this.setState({messages: [message, ...this.state.messages]});
      Socket.emit('message': body);
      e.target.value = '';
    }
  }

  renderScore() {
    if (this.state.roomId) {
      console.log('Multiplayer', this.state.roomId)
      return (
        <div >
          <Score />
          <MultiplayerScore />
        </div>
      );
    } else {
      console.log('Single Player')

      return (<Score />);
    }

  }

  render(){


    const messages = this.state.messages.map((message, index) => {
     return <div key={index}><b>{message.from}:</b>{message.body} </div>
    });

    return (
      <div className="wrap">
        <QuestionList/>
        {this.renderScore()}
        <div> {this.state.room} </div>
        <div> {messages} </div>
        <input type="text" onKeyUp={this.handleSubmit.bind(this)}></input>
      </div>
    );
  }
}
