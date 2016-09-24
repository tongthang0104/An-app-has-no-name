import React, { Component }  from 'react';
import NavBar from './navigation_bar';
import QuestionList from '../containers/question-list';

export default class App extends Component {
  render(){
    return (
      <div className="wrap">
        <QuestionList />
      </div>
    );
  }
}
