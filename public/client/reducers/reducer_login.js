'user strict';
import { LOGIN_USER_REQUEST } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case LOGIN_USER_REQUEST:
    if(action.payload.data){
      console.log(action.payload.data, 'HERE IS DATA');
      return action.payload.data;
    }
  }
  return state;
}

