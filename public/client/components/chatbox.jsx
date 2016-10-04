import React, {Component} from 'react';
import Socket from '../socket';


export default class Chatbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      username: null,
      canEdit: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount(){
    Socket.on('message', data => {
     this.setState({messages: [data, ...this.state.messages]});
    });
  }


  addUser(a){
    a.preventDefault();
    if (this.state.canEdit) {
      this.setState({username: a.target.value});
      Socket.emit('username', this.state.username);

    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const body = e.target.value;

    if (e.keyCode === 13 && body) {
      const data = {
        message: body,
        from: this.state.username
      };
    Socket.emit('message', data);
    e.target.value = '';
    this.setState({canEdit: false});
   }
 }

  render(){
    const messages = this.state.messages.map((data, index) => {
      return <li key={index}>{data.from ? data.from : "Guest"}: {data.message}</li>
    });
    return (
      <div>
        <div className="message-container">
          <ul className="chat">{messages}</ul>
        </div>
        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Enter Username" onKeyUp={this.addUser}/>
              <input type="text" className="form-control" placeholder="Enter Message" onKeyUp={this.handleSubmit}/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
