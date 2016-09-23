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
    if (!this.props.score) {
      this.props.changeScore(0);
    } else {
      this.props.changeScore(this.props.score);
    }
  }

  render() {
    return (
      <div> 
        <div className="panel panel-default">
          <div className="panel-heading">Your Score</div>
          <div className="panel-body">
            {this.props.score}
          </div>
        </div>      
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

