import React, { Component }  from 'react';
import QuestionList from '../containers/question-list';
import QuestionDetail from '../containers/question-detail';

export default class Categorys extends Component {
  render(){
    return (
        <div>
        <QuestionList />
        <QuestionDetail />
        </div>
    );
  }
}
