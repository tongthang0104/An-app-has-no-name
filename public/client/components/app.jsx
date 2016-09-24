import React, { Component }  from 'react';
import NavBar from './navigation_bar';
import QuestionList from '../containers/question-list';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {messages: []};
  }

  componentDidMount() {


    let room = '12345'
    this.socket = io();

    // this.socket.on('room', (socket) => {
    //   console.log('I am room')
    // });




    this.socket.emit('room', room);


    this.socket.on('message', message => {
      this.setState({messages: [message, ...this.state.messages]});
      console.log("i am socket", message, room)

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
        from: 'Thang'
      }
      this.setState({messages: [message, ...this.state.messages]});


      this.socket.emit('message', body);
      console.log('body',this.socket)
      e.target.value = '';
    }


  }

  render(){

    const messages = this.state.messages.map((message, index) => {
     return <div key={index}><b>{message.from}:</b>{message.body} </div>
    });


    return (
      <div className="wrap">
<<<<<<< HEAD
        <div>console.log();</div>
        <CategoryList />
          <div> {messages} </div>
          <input type="text" onKeyUp={this.handleSubmit.bind(this)}></input>
=======
        <QuestionList />
>>>>>>> (feat) Implement post requests with random categories
      </div>
    );
  }
}
