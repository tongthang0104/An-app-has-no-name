import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { browserHistory, withRouter, Link } from 'react-router';
import QuestionDetail from './question-detail';
import { selectQuestion, changeScore, resetQuestion } from '../actions/index';
import Socket from '../socket';
import ReactCountDownClock from 'react-countdown-clock';
import ResultDetail from './result-detail';
import * as audio from '../audio';
import {customStyles} from '../helpers/lodashHelper.js';

class QuestionList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      chosenQuestion: [],
      singleP: [],
      resultModal: false,
      p1ScoreResultModal: "0",
      p2ScoreResultModal: "0",
      answerResultModal: '',
      gameOver: false,
      playerTwoScore: 0,
      yourTurn: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.closeResult = this.closeResult.bind(this);
    this.getScore = this.getScore.bind(this);
    this.closeEndingModal = this.closeEndingModal.bind(this);
    this.changeScore = this.props.changeScore.bind(this);
    this.resetQuestion = this.props.resetQuestion.bind(this);
    this.reset = this.reset.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
  }

  routerWillLeave(nextLocation) {
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    if (!this.state.gameOver)
      return 'Your work is not saved! Are you sure you want to leave?'
      // return false;
  }

  componentWillMount() {
      Socket.on('receiveMultiplayerQuestions', (data) => {
        console.log("roomID in QuestionList", data.roomId);
        this.setState({roomId: data.roomId});
      });

      Socket.on('playerJoined', (data) => {
        console.log("roomID in QuestionList", data.roomId);
        this.setState({roomId: data.roomId});
      });
  }

componentDidMount() {
  this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
  Socket.on('receiveOpenOrder', (data) => {
    console.log(data);
    this.setState({
      modalOpen: !data.modalOpen,
      chosenQuestion: [data.question._id, ...this.state.chosenQuestion],
      answerResultModal: data.question.correct_answer,
      currentQuestion: data.question
    });

    // data.question.difficulty = '';
    console.log('questionId', data.question._id)
    this.props.selectQuestion(data.question);
  });

  Socket.on('receiveCloseOrder', (data) => {
    console.log('receiveCloseOrder QL', data)
    this.setState({
      modalOpen: false,
      resultModal: true,
    });
  });
  Socket.on('broadcastScore', (data) => {
    console.log(" score from qL", data)
    this.setState({
      p2ScoreResultModal: data.amount,
      playerTwoScore: data.score,
      //broadcast yourTurn to be true to the other player
      yourTurn: true
    });
  });

  Socket.on('gameOver', this.gameOver);
  Socket.on('turnChange', (data) => {
    console.log("TURN CHANGING IN cLIENT", data.yourTurn);
    this.setState({yourTurn: data.yourTurn});
  });
}

openModal(question) {
  this.setState({answerResultModal: question.correct_answer});
  if (this.state.chosenQuestion.includes(question._id) || question.clicked === true || !this.state.yourTurn) {
    console.log('Not available');
  } else {
    let data = {
      roomId: this.state.roomId,
      modalOpen: this.state.modalOpen,
      question: question,
      chosenQuestion: this.state.chosenQuestion.length
    };
    // Invoke openModal at the server and send data back
    //Check if multiplayer or not
    if (this.state.roomId) {
      Socket.emit('openModal', data);
      // Set turn to be false
      this.setState({yourTurn: false});
    } else {
      this.setState({modalOpen: true});
    }
    question.clicked = true;
  }
}

gameOver(data) {
  if(this.state.roomId){
    if(data.gameOver){
      audio.play('gameOver');
      this.setState({
        gameOver: true
      });
      // browserHistory.push('/endgame');
    }
  } else {
    this.reset();
    browserHistory.push('/endgame');
  }
}
reset(){
  this.changeScore(0);
  this.resetQuestion()
}
closeResult(){
  this.setState({
    resultModal:false,
    modalOpen: false,
    p1ScoreResultModal: "0",
    p2ScoreResultModal: "0"
  });
}
closeModal() {
  let data = {
    roomId: this.state.roomId,
    modalOpen: !this.state.modalOpen,
    chosenQuestion: this.state.chosenQuestion.length,
    currentQuestion: this.state.currentQuestion,
  };

  if (this.state.roomId) {
    Socket.emit('closeModal', data);
  } else {
    let counter = 0;
    this.setState({
      modalOpen: false,
      singleP: [counter++, ...this.state.singleP]
    });
    console.log('singleP', this.state.singleP);
    if(this.state.singleP.length === 5){
      this.gameOver();
    }
  }
  Socket.emit('trackingGame', data);
  this.setState({resultModal:true})
}

closeEndingModal(){
  this.reset();
  browserHistory.push('/');
  this.setState({
    gameOver: false,
  });
}

renderQuestion(questions) {
  const { modalOpen } = this.state;
  return questions.map(question => {
    return (
      <div className="question-list" key={question._id}>
        <div
          onClick={() => {
              this.openModal(question)
              if (!this.state.roomId) {
                this.props.selectQuestion(question);
              }
            }
          }
          className="list-group-item questions"
        >
          {question.difficulty}
        </div>
      </div>
    );
  })
}

renderList() {
  if(!this.props.questions){
    return (
      <div> Loading...</div>
    )
  }
  return Object.keys(this.props.questions).map(cate => {
    return (
       <td id="customTable">
         <th  className="list-group-item" key={cate} >
           {cate}
         </th>
         {this.renderQuestion(this.props.questions[cate])}
       </td>
    );
  });
}

getScore(data){
  this.setState({ p1ScoreResultModal: data });
  console.log('kjasdhfkasdjs', data);
}
render (){
  console.log("roomId", this.state.roomId)
  let loadingView = {
    loading: (
      <h1>Loading... </h1>
    ),
    waitingHost: (
      <div>
        <h1>Waiting for host.. </h1>
        <button onClick={this.closeModal}>Exit</button>
      </div>
    )
  };

  let waitingModal = (
      <Modal
        isOpen={this.props.questions ? false : true}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
            this.closeModal();
          }
        }
        style={customStyles}
      >
      {this.state.roomId ? loadingView.waitingHost : loadingView.loading}

      </Modal>
  );
  let endingModal = (
    <Modal
      isOpen={this.state.gameOver}
      onRequestClose={() => {
          this.closeModal();
        }
      }
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
    <h1>Your score: {this.props.playerOneScore}</h1>
    <h1>Player 2: {this.state.playerTwoScore}</h1>
    {this.state.playerTwoScore > this.props.playerOneScore ? <h3>Player 2 wins!</h3> : <h3>You Win!</h3>}
    <button onClick={this.closeEndingModal}>Go to home page</button>
    </Modal>
  );

  let questionDetailModal = (
    <Modal
      isOpen={this.state.modalOpen}
      shouldCloseOnOverlayClick={false}
      onRequestClose={() => this.closeModal()}
      style={customStyles} >
      <QuestionDetail  closeModal={this.closeModal} roomId={this.state.roomId} getScore={this.getScore}/>
      <button onClick={this.closeModal}>Close</button>
    </Modal>
  );

  let questionResultModal = (
    <Modal
      isOpen={this.state.resultModal}
      shouldCloseOnOverlayClick={false}
      onRequestClose={() => this.closeResult()}
      style={customStyles} >
      <ResultDetail  roomId={this.state.roomId} Player1={this.state.p1ScoreResultModal} Player2={this.state.p2ScoreResultModal} Correct={this.state.answerResultModal} />
      <ReactCountDownClock
        seconds={5}
        color="blue"
        alpha={1.5}
        showMilliseconds={false}
        size={75}
        onComplete={this.closeResult}
      />
      <button onClick={this.closeResult}>Close</button>
    </Modal>
  );
    return (
      <div className="List-group" key={this.props.questions}>
        <table className="table">
          <td>{this.renderList()}</td>
        </table>
        {this.state.yourTurn ? <h1>Your turn pick a question</h1> : <h1>Player 2 picking ...</h1>}
        {waitingModal}
        {endingModal}
        {questionDetailModal}
        {questionResultModal}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    questions: state.QuestionReducer,
    roomId: state.roomId,
    playerOneScore: state.ScoreReducer
  };
}



export default connect(mapStateToProps, {selectQuestion, changeScore, resetQuestion})(withRouter(QuestionList));;
