'user strict';

import { combineReducers } from 'redux';
import activeQuestion from './reducer_active_question';
import QuestionReducer from './reducer_post';
import ScoreReducer from './score_reducer';

const rootReducer = combineReducers({
  activeQuestion,
  QuestionReducer,
  ScoreReducer,
});

export default rootReducer;
