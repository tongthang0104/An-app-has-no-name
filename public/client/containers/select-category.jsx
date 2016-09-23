import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div>
      <form className="customForm" onSubmit={handleSubmit}>
        <div className="customForm">
          <label htmlFor="category">Category 1</label>
            <Field name="category" id="category" component="input" type="checkbox"/>
        </div>
        <div className="customForm">
          <label htmlFor="category">Category 2</label>
            <Field name="category" id="category" component="input" type="checkbox"/>
        </div>
        <div style={{padding: '20px'}}>
          <button className="btn btn-primary btn-lg " type="submit" disabled={pristine || submitting}>Play</button>
          <button className="btn btn-primary btn-lg" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(SimpleForm)