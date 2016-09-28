'user strict';
import {
  LOGIN_USER_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESEND_FAILURE,
  VERIFY_EMAIL_ERROR,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from '../constants/index';

export default function(state = null, action) {
  switch(action.type) {
    case LOGIN_USER_REQUEST:
    console.log(LOGIN_USER_REQUEST);
    if(action.payload.data){
      console.log(action.payload.data, 'Login check returned from server');
      return action.payload.data;
    }
    case SIGNUP_SUCCESS:
    console.log(SIGNUP_SUCCESS);
    if(action.payload.data){
      console.log(action.payload.data, 'Singup check returned from server');
      return action.payload.data;
    }
  }
  return state;
}

