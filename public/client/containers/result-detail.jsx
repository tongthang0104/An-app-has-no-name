import React, { Component }  from 'react';

export default class ReactDetail extends Component {
  constructor (props) {
    super(props);
  }

  renderResult() {
    if(this.props.roomId){
      return (
        <div>
          <h1>Player1 Score: {this.props.Player1}</h1>
          <h1>Player2 Score:  {this.props.Player2}</h1>
          <h1>Correct Answer: {this.props.Correct}</h1>
        </div>
      );

    } else {
      return (
        <div>
          <h1>Player1 Score: {this.props.Player1}</h1>
          <h1>Correct Answer: {this.props.Correct}</h1>
        </div>
      );
    }

  }

  render() {
    console.log("This is score", this.props.Player1)
    return (
      <div>
        {this.renderResult()}
      </div>
    );
  }
}
