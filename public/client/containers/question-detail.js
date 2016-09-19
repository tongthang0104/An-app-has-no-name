import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Correct from '../components/correct';

class QuestionDetail extends Component {
<<<<<<< 37bbe3aee318d13827f5551cff5aa3b1e014ea3a
  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

openModal() {
  console.log('workign');
  this.setState({modalOpen: true});
}
=======
>>>>>>> (cleanup)

  checkAnswer(event) {
<<<<<<< 37bbe3aee318d13827f5551cff5aa3b1e014ea3a
    console.log(this.props.question.correct_answer);
    if(this.props.question.correct_answer === event.target.id) {
      console.log('right');

=======
    if(this.props.question.correct_answer === event.target.id) {
      console.log('right')
      return <div><Correct /></div>
>>>>>>> (cleanup)
    } else {
      console.log('wrong');
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
    const props = this.props.question
    const answerArray = [props.correct_answer]
    for(let i = 0; i < props.incorrect_answers.length; i++){
      answerArray.push(props.incorrect_answers[i])
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
