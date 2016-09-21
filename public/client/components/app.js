import React, { Component }  from 'react';
// import Categories from '../containers/categories';
// import QuestionsList from '../containers/questionsList';
import NavBar from './navigation_bar';
import QuestionList from '../containers/question-list';
import QuestionDetail from '../containers/question-detail';

export default class App extends Component {
  render(){
    return (
      <div>
        <QuestionList />
        <QuestionDetail />
      </div>
    );
  }
}
