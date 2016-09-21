import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchQuestion } from '../actions/index';
import { Link } from 'react-router';

class FetchBar extends Component {

  constructor(props) {
    super(props);

    this.fetchQuestion = this.props.fetchQuestion.bind(this);
  }

  render() {
    return (
      <button onClick={ this.fetchQuestion } className="btn btn-primary">Fetch</button>
    );
  }
}


export default connect(null, {fetchQuestion})(FetchBar);
