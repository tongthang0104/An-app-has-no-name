import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import { fetchQuestion } from '../actions/index';
import { browserHistory } from 'react-router'

function submit(values) {
  console.log(values.categories);
  console.log('something here');
}

const renderMultiselect = ({ input, ...rest }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    {...rest}/>

const categoriesList =  [
  'General Knowledge',
  'Entertainment: Books',
  'Entertainment: Film',
  'Entertainment: Music',
  'Entertainment: Television',
  'Entertainment: Video Games',
  'Entertainment: Board Games',
  'Entertainment: Japanese Anime & Manga',
  'Entertainment: Cartoon & Animations',
  'Science & Nature',
  'Science: Computers',
  'Science: Mathematics',
  'Mythology',
  'Sports',
  'Geography',
  'History',
  'Politics',
  'Art',
  'Celebrities',
  'Animals',
  'Vehicles',
];
class SelectCatForm extends Component {
  constructor (props) {
    super(props);
    this.fetchQuestion = this.props.fetchQuestion.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.fetchQuestion(values.categories);
    browserHistory.push('/play');
    
    
  }  

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>  
        <form onSubmit={handleSubmit(this.submit)}>
          <div>
            <label>Categories</label>
            <Field
              name="categories"
              component={renderMultiselect}
              data={categoriesList}/>

          </div>
          <div>
            {/* <Link to="/play" className="btn btn-primary btn-lg btn-block navbar" data-loading-text="Loading...">Play</Link> */}
             <button type="submit" disabled={pristine || submitting}>Submit</button> 
            <button type="button" disabled={pristine || submitting} onClick={reset}>Reset Values
            </button>
          </div>
        </form>
      </div>
    )
  }
  
}

SelectCatForm = reduxForm({
  form: 'selectCatForm',
})(SelectCatForm)
// const selector = formValueSelector('selectCatForm') 
// SelectCatForm = connect(
//   state => {
//     const categories = selector(state, 'categories')
//     return {
//       categories,
//     }
//   }
// )(SelectCatForm)

export default connect(null, {fetchQuestion})(SelectCatForm);


