'user strict';

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import activeQuestion from './reducer_active_question';
import AuthReducer from './reducer_auth';
import QuestionReducer from './reducer_post';
import ScoreReducer from './reducer_score';

const rootReducer = combineReducers({
  form,
  AuthReducer,
  activeQuestion,
  QuestionReducer,
  ScoreReducer,
});

export default rootReducer;
