import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectQuestion } from '../actions/index';
import { bindActionCreators } from 'redux';
import QuestionDetail from './question-detail';
import Modal from 'react-modal';

class QuestionList extends Component {
  constructor () {
    super();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

componentWillMount() {
  this.setState({categories: this.props.categories})
}
openModal() { this.setState({open: true});
console.log('hi') }

closeModal() { this.setState({open: false}); }

renderQuestion(questions) {

  return questions.map(question => {
    return (
      <div>
      <button
        key={this.props.title}
        onClick={() => this.props.selectQuestion(question)}
        className="list-group-item">
        {question.difficulty}
      </button>
      </div>
    );
  })
}


renderList() {
  return this.state.categories.map(cate => {
    let questions = this.props.questions.filter(question => {
      return question.category === cate
    })

    console.log("filter", questions);
    return (
      <div className="col-md-3">
        <li key={cate} >{cate}</li>
        {this.renderQuestion(questions)}
      </div>
    );
  });
}


  // renderList(){
  //   console.log(this.props.questions)
  //
  //   return this.props.questions.map((question) => {
  //     return (
  //       <div>
  //       <button
  //         key={this.props.title}
  //         onClick={() => this.props.selectQuestion(question)}
  //         onClick={this.props.openModal}
  //         className="list-group-item">
  //         {question.difficulty}
  //       </button>
  //       <Modal isOpen={this.props.open}>
  //         <h1>Basic Modal</h1>
  //         <button onClick={this.props.closeModal}>Close</button>
  //       </Modal>
  //       </div>
  //     );
  //   });
  // }



  // renderCategory(){
  //   const title = this.props.questions[0].category;
  //   return (
  //     <div className="list-group-item" key={this.props.title}>
  //       {title}
  //     </div>
  //   )
  // }

  render (){
    return (
      <div className="List-group col-sm-4" key={this.props.title}>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories,
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectQuestion: selectQuestion }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
