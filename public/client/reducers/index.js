'user strict';

import { combineReducers } from 'redux';
import activeQuestion from './reducer_active_question';
import QuestionReducer from './reducer_post';
import ScoreReducer from './score_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  activeQuestion,
  QuestionReducer,
  ScoreReducer,
  form: formReducer,
});

export default rootReducer;
