import React, { Component }  from 'react';
import NavBar from './navigation_bar';
import QuestionList from '../containers/question-list';
import QuestionDetail from '../containers/question-detail';

export default class App extends Component {
  render(){
    return (
      <div>
        <QuestionList />
      </div>
    );
  }
}
