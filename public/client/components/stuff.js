import React, { Component }  from 'react';
import QuestionList from '../containers/question-list';
import QuestionDetail from '../containers/question-detail';
import SearchBar from '../containers/search_bar';
import Category from '../containers/category';


export default class App extends Component {
  render(){
    return (
      <div>
        <SearchBar />
        <div>
          <QuestionList />
          <QuestionDetail />
        </div>
      </div>
    );
  }
}
