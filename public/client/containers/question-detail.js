import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router';
import Modal from 'react-modal';

class QuestionDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

openModal() {
  console.log('workign')
  this.setState({modalOpen: true});
}

closeModal() {
  this.setState({modalOpen: false});
}
  checkAnswer(event) {
    console.log(this.props.question.correct_answer)
    if(this.props.question.correct_answer === event.target.id) {
      console.log('right')

    } else {
      console.log('wrong')
    }
  }
  renderAnswer(array) {
    const shuffle = _.shuffle(array)
    return shuffle.map((answer) => {
      return (
        <li id={answer} onClick={this.checkAnswer.bind(this)}>
            {answer}
        </li>
      );
    });
  }
  render() {
      const { modalOpen } = this.state;
    const props = this.props.question
    if (!props){
      return <div>Select a question to start!</div>
    }
    const answerArray = [props.correct_answer]
    for(let i = 0; i < props.incorrect_answers.length; i++){
      answerArray.push(props.incorrect_answers[i])
    }

    return (
      <div>
        <h3>Question:</h3>
        <div>{props.question}</div>
          <div> {this.renderAnswer(answerArray)} </div>
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
