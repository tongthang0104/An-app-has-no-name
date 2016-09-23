import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchQuestion } from '../actions/index';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

class FetchBar extends Component {
  constructor(props) {
    super(props);

    this.fetchQuestion = this.props.fetchQuestion.bind(this);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form className="customForm" onSubmit={handleSubmit}>
          <div className="customForm">
            <label htmlFor="category">Category 1</label>
              <Field name="category" id="category" component="input" type="checkbox"/>
          </div>
          <div className="customForm">
            <label htmlFor="category2">Category 2</label>
              <Field name="category2" id="category2" component="input" type="checkbox"/>
          </div>
          <div style={{padding: '20px'}}>
            <Link to="/play" onClick={ this.fetchQuestion } className="btn btn-primary btn-lg btn-block navbar" data-loading-text="Loading...">Play</Link>
            <button className="btn btn-primary btn-lg" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </form>
      </div>
    );
  }
}

// function mapStateToProps(state){
//   return {
//     categories: state.categories,
//     questions: state.QuestionReducer,
//     modal: state.openModal
//   };
// }

FetchBar = reduxForm({ 
  form: 'FetchBar' })(FetchBar)

export default connect(null, {fetchQuestion})(FetchBar);