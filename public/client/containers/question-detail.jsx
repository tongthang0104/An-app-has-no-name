import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCountDownClock from 'react-countdown-clock';
import _ from 'lodash';
import { changeScore, incrementScore, decrementScore } from '../actions/index';
import { unescapeHelper } from '../helpers/lodashHelper';
import Socket from '../socket';
import Modal from 'react-modal';
import FinishGame from '../components/finish-game';
import * as audio from '../audio';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '50%',
    height                : '50%'
  }
};

class QuestionDetail extends Component {
  constructor (props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  close(){
    this.setState({isModal: false});
    this.props.closeModal();
  }
  open(){
    audio.play('nothing');

    this.setState({isModal:true});
    let that = this;
    setTimeout(()=>{
      that.close();
    },0);
  };

  checkAnswer(event) {
    this.setState({completed: true});
    if(this.props.question.correct_answer === event.target.id) {
      this.props.incrementScore(this.props.score, this.props.question.difficulty, this.props.roomId);
      let adding = '+' + this.props.question.difficulty;
      this.props.getScore(adding);
      this.setState({isModal:true});
      audio.play('correct');

    } else {
      this.props.decrementScore(this.props.score, this.props.question.difficulty, this.props.roomId);
      let subing = '-' + this.props.question.difficulty;
      this.props.getScore(subing);
      this.setState({isModal:true});
      audio.play('wrong');
    }
    this.props.question.difficulty = '';
    this.setState({isModal:true});
    this.setState({roomId: this.props.roomId});
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
    console.log('props in render qd',this.props)
    if(!props){
      return (
        <div />
      );
    }
    const question = unescapeHelper(props.question);
    const answerArray = [unescapeHelper(props.correct_answer)]
    for(let i = 0; i < props.incorrect_answers.length; i++){
      answerArray.push(unescapeHelper(props.incorrect_answers[i]))
    }

    return (
      <div>
        <h3>Question:</h3>
        <h3>{question}</h3>
          {this.renderAnswer(answerArray)}
          <ReactCountDownClock
            seconds={5}
            color="blue"
            alpha={1.5}
            showMilliseconds={false}
            size={75}
            onComplete={this.props.closeModal}
          />
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
