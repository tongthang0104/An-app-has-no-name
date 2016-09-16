import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectQuestion } from '../actions/index';
import { bindActionCreators } from 'redux';

class QuestionList extends Component {
  renderList(){
    return this.props.questions.map((question) => {
      return (
        <h5
          onClick={() => this.props.selectQuestion(question)}
          className="list-group-item">
          {question.difficulty}
        </h5>
      );
    });
  }

  render (){
    return (
      <ul className="List-group col-sm-4">
        {this.renderList()}
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
