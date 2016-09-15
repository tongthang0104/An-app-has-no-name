import { combineReducers } from 'redux';
import profiles from './reducer_profile';
import activePerson from './reducer_active_person';

const rootReducer = combineReducers({
  profiles,
  activePerson
});
export default rootReducer;
