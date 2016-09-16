import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../actions/index';
import { Link } from 'react-router';

class Question extends Component {
  componentWillMount() {
    console.log('hi')
  }
  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/" className="btn btn-primary">
            HI people
            </Link>
        </div>
        STUFFF
      </div>
    );
  }
}
export default connect(null, {fetchQuestion})(Question);
