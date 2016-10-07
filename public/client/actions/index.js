'use strict';

import axios from 'axios';
import { browserHistory } from 'react-router';
import { CHANGE_SCORE, DECREMENT_SCORE, FETCH_QUESTIONS, FETCH_QUESTIONS_RANDOM, INCREMENT_SCORE, QUESTION_SELECTED, LOGIN_USER_REQUEST, FETCH_MULTI_QUESTIONS, SIGNUP_SUCCESS, UNAUTH_USER, RESET_QUESTION, USER_INFO, SCORE_SAVE_SUCCESS, SIGNUP_FAILURE, SIGNIN_FAILURE, FETCH_LEADERBOARD,AUTH_USER, SIGNIN_SUCCESS, GET_USER_INFO } from '../constants/index';

export function getUserInfo(username, id) {
  console.log('this got called from getUserInfo');
  const userInfo = { username, id }
  return {
    type: GET_USER_INFO,
    payload: userInfo
  }
}
export function saveUserInfo(username, roomId) {
  // console.log('Username from saveUserInfo actions: ', username, roomId);

  const userInfo = { username, roomId }
  return {
    type: USER_INFO,
    payload: userInfo
  }
}
export function getLeaderboard() {
  const url = `/scores/get/leaderboard`;
  const serverResponse = axios.get(url)
    .then((response) => {
      console.log(response, "Here is the leaderboard...");
      return {
        type: FETCH_LEADERBOARD,
        payload:response
      }
    })
    .catch(function (error) {
    console.log(error);
  });
  return serverResponse;
}

export function saveScore(props) {
  const url = `/scores/save`;
  const serverResponse = axios.post(url, props)
    .then((response) => {
      return {
        type: SCORE_SAVE_SUCCESS,
        payload:response
      }
    })
    .catch(function (error) {
    console.log(error);
  });
  return serverResponse;
}

// export function signinUser(props) {
//   const { email, password } = props;

//   return function (dispatch) {
//     axios.post(`${API_URL}/signin`, { email, password })
//       .then(response => {
//         localStorage.setItem('user', JSON.stringify(response.data));

//         dispatch({ type: AUTH_USER });

//         browserHistory.push('/reduxauth/users');
//       })
//       .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
//   }
// }

export function signinUser(props) {
  const url = `/users/signin`;
  return function (dispatch) {
    console.log('check if going into signin func');
    axios.post(url, props)
      .then((response) => {
      console.log("check axios post");
        const username = JSON.stringify(response.data.username);
        const id = JSON.stringify(response.data.id);
        // return getUserInfo(username, id);
        // const userInfo = {username, id}
        localStorage.setItem('user', JSON.stringify(response.data.token));
        localStorage.setItem('username', username);
        localStorage.setItem('id', id);
        console.log("Response data from signin",response.data);
        dispatch({ 
          type: AUTH_USER ,
          payload: { username }
        });
        browserHistory.push('/');
      })
      .catch((response) => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }



  // const serverResponse = axios.post(url, props)
  //   .then((response) => {
  //     const username = response.data.username;
  //     const id = response.data.id;
  //     const userInfo = {username, id}
  //     localStorage.setItem('user', JSON.stringify(response.data.token));
  //     localStorage.setItem('username', username);
  //     localStorage.setItem('id', id);
  //     return {
  //       type: LOGIN_USER_REQUEST,
  //       payload:response
  //     }
  //   })
  //   .catch(function (error) {
  //   console.log(error);
  // });
  // return serverResponse;
}
export function authError(CONST, error) {
  console.log('error from authError', error);
  return {
    type: CONST,
    payload: error,
  };
}



export function signupUser(props) {
  console.log('signup user check');
  const url = `/users/signup`;
  return function (dispatch) {
    console.log('check if going into func');
    axios.post(url, props)
      .then((response) => {
      console.log("check axios post");
        const username = JSON.stringify(response.data.username);
        const id = JSON.stringify(response.data.id);
        // getUserInfo(username, id);
        // const userInfo = {username, id}
        localStorage.setItem('user', JSON.stringify(response.data.token));
        localStorage.setItem('username', username);
        localStorage.setItem('id', id);
        console.log("Response data from signup",response.data);
        dispatch({ 
          type: AUTH_USER, 
          payload: { username } 
        });
        browserHistory.push('/');
      })
      .catch((response) => {
        dispatch(authError(SIGNUP_FAILURE, response.response.data.error));
      });
  }
}


export function signoutUser() {
  localStorage.clear();
  browserHistory.push('/')
  return {
    type: UNAUTH_USER,
  }
}

export function selectQuestion(question) {
  return {
    type: QUESTION_SELECTED,
    payload: question
  };
}
export function fetchQuestionsRandCat(){
  const request = axios.get('/api/questions');
  return {
    type: FETCH_QUESTIONS_RANDOM,
    payload:request
  };
}

export function fetchQuestions(categories){
  console.log(categories[0], "CHECKING CAT");
  const url = `/api/questions/${categories[0]}/${categories[1]}/${categories[2]}/${categories[3]}/${categories[4]}`;
  const request = axios.get(url);
  return {
    type: FETCH_QUESTIONS,
    payload:request,
  };
}


export function fetchQuestionsMultiplayer(questions) {

  console.log('fetching from multiplayer', questions)
  return {
    type: FETCH_MULTI_QUESTIONS,
    payload:questions,
  };
}

export const changeScore = (score) => {
  return {
    type: CHANGE_SCORE,
    score: score,
  };
};

export const incrementScore = (score, difficulty, roomId) => {
  console.log('THIS IS INCREMENT_SCORE', difficulty);
  return {
    type: INCREMENT_SCORE,
    roomId: roomId,
    score: score,
    difficulty: difficulty,
  };
};

export const decrementScore = (score, difficulty, roomId) => {
  console.log('THIS IS DECREMENT_SCORE', score, "difficulty:", difficulty);

  return {
    type: DECREMENT_SCORE,
    roomId: roomId,
    score: score,
    difficulty: difficulty,
  };
};

export const resetQuestion = () => {
  return {
    type: RESET_QUESTION,
    payload: null
  };
};
