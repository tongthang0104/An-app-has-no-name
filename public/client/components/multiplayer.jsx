import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router';


export default class FetchBar extends Component {

  constructor(props) {
    super(props);
    this.roomGenerator = this.props.roomGenerator.bind(this);
    this.joinRoom = this.props.joinRoom.bind(this);
    this.getInput = this.props.getInput.bind(this);
  }
  render() {

    let html = {
      roomCreated: (
          <div>
            <br></br>
            <h5>You Joined Room: {this.props.roomCreated}</h5>
          </div>),
        generateButton: (
          <Button tooltip="Click here to create new room" onClick={this.roomGenerator}>Generate room</Button>
        ),

        joinButton : (
          <Link to={this.props.roomValid ? "/multiplayer" : "/"} onClick={this.joinRoom}>
            <Button waves='light'>Join room</Button>
          </Link>
        ),
    }
    return (
      <div>
        <form >
          {this.props.roomCreated ? null : html.generateButton}
          {this.props.roomCreated ? html.roomCreated : null}
        </form>
        <input
          type="text"
          placeholder="Enter a room"
          value={this.props.roomId}
          onChange={this.getInput}>
        </input>
        {(this.props.host.room !== this.props.roomId) && this.props.roomId ? html.joinButton : null}
      </div>
    );
  }
}
