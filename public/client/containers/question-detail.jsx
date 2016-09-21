import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


class QuestionDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this)
  }

openModal() {
  console.log('workign');
  this.setState({modalOpen: true});
}

closeModal() {
  this.setState({modalOpen: false});
}

checkAnswer(event) {
  this.setState({completed: true})
  this.props.checkCompleted();
  if(this.props.question.correct_answer === event.target.id) {
    console.log('right');
  } else {
      console.log('wrong');
      console.log('state', this.props);
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
