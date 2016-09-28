import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import QuestionDetail from './question-detail';
import { selectQuestion } from '../actions/index';
import Socket from '../socket';

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
      chosenQuestion: []
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }


componentWillMount() {
    Socket.on('receiveMultiplayerQuestions', (data) => {
      console.log("roomID in QuestionList", data.roomId);
      this.setState({roomId: data.roomId});
    });
}

componentDidMount() {
  Socket.on('receiveOpenOrder', (data) => {
    this.setState({
      modalOpen: !data.modalOpen,
      chosenQuestion: [data.question._id, ...this.state.chosenQuestion]
    });

    console.log('questionId', data.question._id)
    this.props.selectQuestion(data.question);
  });

  Socket.on('receiveCloseOrder', (data) => {
    this.setState({
      modalOpen: data.modalOpen
    });
  });
  Socket.on('gameOver', this.gameOver)
}

openModal(question) {
  console.log('List of chosenQuestion:', this.state.chosenQuestion)


  if (this.state.chosenQuestion.includes(question._id)) {
    console.log("Already cliked", question.question);
  } else {

    let data = {
      roomId: this.state.roomId,
      modalOpen: this.state.modalOpen,
      question: question,
      chosenQuestion: this.state.chosenQuestion.length
    };

    // Invoke openModal at the server and send data back
    if (this.state.roomId) {
      Socket.emit('openModal', data);
    } else {
      this.setState({modalOpen: true});
    }

    // question.clicked = true;

  }
}


gameOver(data) {
  setTimeout(alert(data), 3000);
  //need to route or do anything
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
    this.setState({modalOpen: false});
  }

  Socket.emit('trackingGame', data);

}

renderQuestion(questions) {
  const { modalOpen } = this.state;
  return questions.map(question => {
    return (
      <div className="question-list">
        <div
          key={question._id}
          onClick={() => {
              this.openModal(question)
              if (!this.state.roomId) {
                this.props.selectQuestion(question);
              }
            }
          }
          disabled={question.clicked}
          className="list-group-item questions"
        >
          {question.difficulty}
        </div>

        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => {
              this.closeModal();
            }
          }
          style={customStyles}
        >
          <QuestionDetail  checkCompleted={this.closeModal} roomId={this.state.roomId}/>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
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

render (){
    return (
      // <div className="List-group" key={this.props.questions}>
        <table className="table">
          <td>{this.renderList()}</td>
        </table>
      // </div>
    );
  }
}

function mapStateToProps(state){
  return {
    questions: state.QuestionReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectQuestion: selectQuestion }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
