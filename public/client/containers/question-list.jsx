import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectQuestion } from '../actions/index';
import { bindActionCreators } from 'redux';
import QuestionDetail from './question-detail';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

class QuestionList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      modalOpen: false,
      completed: false,
    };
    this.checkCompleted.bind(this);
  }

  componentWillMount() {
    this.setState({categories: this.props.categories});
  }

  checkCompleted() {
    console.log('hioawjfoawf')
    this.setState({modalOpen: false});
  }
  openModal() {

    if(this.state.completed === false ){
    // console.log('workign')
     let that = this;
      this.setState({modalOpen: true});
    setTimeout(function(){
      that.setState({modalOpen: false});
    }, 5000).bind(this);
    }
  }

  closeModal() {
    this.setState({modalOpen: false});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  renderQuestion(questions) {
    const { modalOpen } = this.state;
    return questions.map(question => {
      return (
        <div onClick={this.openModal.bind(this)} key={this.props.question}>
        <div
          key={this.props.title}
          onClick={() => this.props.selectQuestion(question)}
          className="list-group-item">
          {question.difficulty}

        </div>
        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <QuestionDetail  checkCompleted={this.checkCompleted} {...this.state}/>
          <button onClick={this.closeModal.bind(this)}>close</button>
        </Modal>
        </div>
      );
    })
  }

  renderList() {
    return this.state.categories.map(cate => {
      let questions = this.props.questions.filter(question => {
        return question.category === cate
      })
      let list = questions.slice(0,5);
      console.log("filter", questions);
      return (
        <td id="customTable">
          <th  className="list-group-item" key={cate} >{cate}</th>
          {this.renderQuestion(list)}
        </td>
      );
    });
  }

  render (){
    return (
      <div className="List-group" key={this.props.title}>
        <table id="table">
          <td>{this.renderList()}</td>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories,
    questions: state.questions,
    modal: state.openModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectQuestion: selectQuestion }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
