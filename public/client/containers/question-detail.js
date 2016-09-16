import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionDetail extends Component {
  render() {
    const props = this.props.question
    if (!props){
      return <div>Select a question to start!</div>
    }
    return (
      <div>
        <h3>Question:</h3>
        <div>Difficulty: {props.difficulty}</div>
        <div>Question: {props.question}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    question: state.activeQuestion
  };
}
export default connect(mapStateToProps)(QuestionDetail)
