'user strict';
import {
  SIGNUP_SUCCESS,
  AUTH_USER,
  UNAUTH_USER,
  USER_INFO
} from '../constants/index';

export default function(state = null, action) {
  switch(action.type) {
    // case LOGIN_USER_REQUEST:
    // console.log(LOGIN_USER_REQUEST);
    // if(action.payload.data){
    //   console.log(action.payload.data, 'Login check returned from server');
    //   return action.payload.data;
    // }
    case SIGNUP_SUCCESS:
    if(action.payload.data){
      return action.payload.data;
    }
    case UNAUTH_USER:
      console.log('unauth');
      return {state, authenticated: false};
    case USER_INFO:
    if (action.payload.userInfo) {
      console.log("Userinfo to send to chatroom", action.payload.userInfo);
      Socket.emit('fetchUserInfo', action.payload.userInfo)
      return {userInfo: action.payload.userInfo}
    }
  }
  return state;
}

