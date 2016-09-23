import React, { Component } from 'react';
import QuestionList from './question-list';
import Score from './score';

export default class CategoryList extends Component {
  render (){
    return (
      <div key={this.props.title}>
            <QuestionList />
        <div style={{'padding':'400px'}}>
          <Score/>
        </div>
      </div>
    )
  }
}
