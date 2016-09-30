import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { browserHistory } from 'react-router';
import QuestionDetail from './question-detail';
import { selectQuestion, changeScore, resetQuestion } from '../actions/index';
import { renderModal } from '../actions/modalHelper'
import Socket from '../socket';
import ReactCountDownClock from 'react-countdown-clock';
import ResultDetail from './result-detail';
import * as audio from '../audio';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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
    this.renderModal = this.props.renderModal.bind(this);
  }

  componentWillMount() {
      Socket.on('receiveMultiplayerQuestions', (data) => {
        this.setState({roomId: data.roomId});
      });

      Socket.on('playerJoined', (data) => {
        this.setState({roomId: data.roomId});
      });
  }

componentDidMount() {
  Socket.on('receiveOpenOrder', (data) => {
    console.log(data);
    this.setState({
      modalOpen: !data.modalOpen,
      chosenQuestion: [data.question._id, ...this.state.chosenQuestion],
      answerResultModal: data.question.correct_answer
    });

    this.props.selectQuestion(data.question);
  });

  Socket.on('receiveCloseOrder', (data) => {
    this.setState({
      modalOpen: false,
      resultModal: true,
    });
  });

  Socket.on('broadcastScore', (data) => {

    this.setState({
      p2ScoreResultModal: data.amount,
      playerTwoScore: data.score,
    });
  });

  Socket.on('gameOver', this.gameOver);
  Socket.on('turnChange', (data) => {
    //broadcast yourTurn to be true to the other player
    this.setState({yourTurn: data.yourTurn});
  });
}

openModal(question) {

  this.setState({answerResultModal: question.correct_answer});
  if ((this.state.chosenQuestion.includes(question._id) || question.clicked === true || !this.state.yourTurn) && this.state.roomId) {
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
  this.setState({resultModal:false});
  this.setState({modalOpen: false});
}
closeModal() {

  let data = {
    roomId: this.state.roomId,
    modalOpen: !this.state.modalOpen,
    chosenQuestion: this.state.chosenQuestion.length
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
          onClick={(e) => {
              e.preventDefault()
              this.openModal(question)
              if (!this.state.roomId) {
                this.props.selectQuestion(question);
              }
            }
          }
          className="list-group-item questions"
        >
          {(this.state.chosenQuestion.includes(question._id) || question.clicked) ? null : question.difficulty}
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
  console.log('asodifioasj', data)

    this.setState({p1ScoreResultModal: data});

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
    ),

    playerPicking: {
      player1: (
        <h1>Your turn pick a question</h1>
      ),
      player2: (
        <h1>Player 2 picking ...</h1>
      )
    }
  };

  let waitingModal = (
      <Modal
        isOpen={this.props.questions ? false : true}
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
        {this.state.roomId ? (this.state.yourTurn ? loadingView.playerPicking.player1 : loadingView.playerPicking.player2) : null}
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



export default connect(mapStateToProps, {selectQuestion, changeScore, resetQuestion, renderModal})(QuestionList);
