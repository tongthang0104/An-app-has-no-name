import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectQuestion } from '../actions/index';
import { bindActionCreators } from 'redux';
import QuestionList from '../containers/question-list';
import QuestionDetail from '../containers/question-detail';

class Category extends Component {
  renderList(){
    return this.props.questions.map((question) => {
      return (
        <h5
          onClick={() => this.props.selectQuestion(question)}
          className="col-md-1">
          {question.category}
        </h5>
      );
    });
  }

  render (){
    return (
        <div className="row" key={stuff}>
          <ul className="col-md-10">
            {this.renderList()}
            <QuestionList />
            <QuestionDetail />
          </ul>
        </div>
    )
  }
}

function mapStateToProps(state){
  return {
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectQuestion: selectQuestion }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
