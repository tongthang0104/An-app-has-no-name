import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectQuestion } from '../actions/index';
import { bindActionCreators } from 'redux';
import QuestionList from './question-list';
import Modal from 'react-modal';


class CategoryList extends Component {

  componentWillMount() {
    this.setState({categories: this.props.categories});
  }



  render (){
    return (
      <div className="List-group" key={this.props.title}>
        <table id="table">
          <td>
            <QuestionList />
          </td>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
