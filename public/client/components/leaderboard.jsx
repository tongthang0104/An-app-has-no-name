import React, { Component }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Leaderboard extends Component {

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getLeaderboard()
  }
  
  render(){

    return (
      <div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    leaderboard: state.Leaderboard
  }
}
export default connect(mapStateToProps, actions)(Leaderboard);
