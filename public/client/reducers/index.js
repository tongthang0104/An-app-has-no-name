'user strict';

import { combineReducers } from 'redux';
import questions from './reducer_questions';
import activeQuestion from './reducer_active_question';
import QuestionReducer from './reducer_post';
import CategoriesListReducer from './reducer_categoriesList';
// import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  questions,
  activeQuestion,
  post: QuestionReducer,
  categories: CategoriesListReducer
});

export default rootReducer;
