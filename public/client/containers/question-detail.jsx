import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Correct from '../components/correct';

class QuestionDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: true,
      completed: true,
    };
    this.closeModal.bind(this);
  }
  componentWillMount() {
    console.log('props',this.props)
  }
  closeModal() {
    this.setState({modalOpen: false});
  }

  checkAnswer(event) {
    this.setState({completed: true})
    this.props.checkCompleted();
    if(this.props.question.correct_answer === event.target.id) {
      console.log('right');
      this.closeModal();
    } else {
      console.log('wrong');
      console.log('state', this.props)
      this.closeModal();
    }
  }

  renderAnswer(array) {
    const shuffle = _.shuffle(array);
    return shuffle.map((answer) => {
      return (
        <div id={answer} onClick={this.checkAnswer.bind(this)}>
          {answer}
        </div>
      );
    });
  }

  render() {
    const props = this.props.question;
    const answerArray = [props.correct_answer];
    for(let i = 0; i < props.incorrect_answers.length; i++){
      answerArray.push(props.incorrect_answers[i]);
    }

    return (
      <div id="modal">
        <h3>Question:</h3>
        <h3>{props.question}</h3>
        {this.renderAnswer(answerArray)}
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
