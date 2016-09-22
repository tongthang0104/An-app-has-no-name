import React, { Component }  from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { changeScore } from '../actions/index';
import { bindActionCreators } from 'redux';

class Score extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.changeScore(100);
  }

  render() {
    return (
      <div> 
        <span>Render Score:</span>
        {this.props.score} 
      </div>
    );
  }
};


function mapStateToProps(state){
  return {
    score: state.ScoreReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeScore }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);

