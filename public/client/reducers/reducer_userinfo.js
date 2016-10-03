'user strict';
import {
  USER_INFO,
} from '../constants/index';


export default function(state = null, action) {
  switch(action.type) {
  case USER_INFO:
      console.log('jhgjhgjhgjgjhgjghjh', action.payload);
    if (action.payload) {
      return action.payload;
    } 
  }
  return state;
}


