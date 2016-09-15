import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileDetail extends Component {
  render() {
    if (!this.props.profile){
      return <div>Select a profile to start!</div>
    }
    return (
      <div>
        <h3>Details for:</h3>
        <div>Name: {this.props.profile.person}</div>
        <div>Friends: {this.props.profile.friend}</div>
        <img src={this.props.profile.img} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.activePerson
  };
}
export default connect(mapStateToProps)(ProfileDetail)
