import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ReactCountDownClock from 'react-countdown-clock';
import { changeScore, incrementScore, decrementScore } from '../actions/index';
import { bindActionCreators } from 'redux';

class QuestionDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer(event) {
    this.setState({completed: true});
    this.props.checkCompleted();
    if(this.props.question.correct_answer === event.target.id) {
      this.props.incrementScore(this.props.score, this.props.question.difficulty);
      this.props.question.difficulty = "CORRECT";
    } else {
      this.props.decrementScore(this.props.score, this.props.question.difficulty);
        this.props.question.difficulty = "INCORRECT";
      }
      this.closeModal();
    }
    renderAnswer(array) {
      const shuffle = _.shuffle(array);
      return shuffle.map((answer) => {
        return (
          <div id={answer} onClick={this.checkAnswer}>
              {answer}
          </div>
        );
      });
    }

  render() {
    const props = this.props.question;
    if(!props){
      return (
        <div></div>
      );
    }
    const question = _.unescape(props.question);
    const answerArray = [_.unescape(props.correct_answer)]
    for(let i = 0; i < props.incorrect_answers.length; i++){
      answerArray.push(_.unescape(props.incorrect_answers[i]))
    }

    return (
      <div>
        <h3>Question:</h3>
        <h3>{question}</h3>
          {this.renderAnswer(answerArray)}
        <ReactCountDownClock seconds={15}
                     color="blue"
                     alpha={1.5}
                     showMilliseconds={false}
                     size={75}
                     onComplete={this.closeModal.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    question: state.activeQuestion,
    score: state.ScoreReducer,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeScore, decrementScore, incrementScore }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail)
