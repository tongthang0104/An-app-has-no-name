'use strict';

import axios from 'axios';

const FETCH_QUESTION = 'FETCH_QUESTION',
      CHANGE_SCORE = 'CHANGE_SCORE',
      INCREMENT_SCORE = 'INCREMENT_SCORE',
      DECREMENT_SCORE = 'DECREMENT_SCORE',
      QUESTION_SELECTED = 'QUESTION_SELECTED';


export function selectQuestion(question) {
  return {
    type: QUESTION_SELECTED,
    payload: question
  };
}
// export function fetchQuestion(categories){
  // const request = axios.get('/api/questions');
//   return {
//     // categories,
//     type: FETCH_QUESTION,
//     payload:request
//   };
// }
export function fetchQuestion(categories){
  // const url = '/api/questions/'
  console.log(categories[0], "CHECKING CAT");
  const url = '/api/questions/' + categories[0] + '/'+ categories[1] + '/' + categories[2] + '/'+ categories[3] + '/' + categories[4] 
  console.log(url, "CHECKING URL");
  const request = axios.get(url);
  return {
    type: FETCH_QUESTION,
    payload:request,
  };
}

// export function getScore(){
//   return {
//     type: 'GET_SCORE',
//     payload:
//   }
// }
// let nextQuestionId = 0
//
// export const addQuestion = question => {
//   return {
//     type: 'ADD_QUESTION',
//     id: nextQuestionId++,
//     question
//   }
// }
//
// export const toggleQuestion = id => {
//   return {
//     type: 'TOGGLE_QUESTION',
//     id
//   }
// }

export const changeScore = (score) => {
  return {
    type: CHANGE_SCORE,
    score: score,
  }
}

export const incrementScore = (score, difficulty) => {
  console.log('THIS IS INCREMENT_SCORE', difficulty);
  return {
    type: INCREMENT_SCORE,
    score: score,
    difficulty: difficulty,
  }
}

export const decrementScore = (score, difficulty) => {
  console.log('THIS IS DECREMENT_SCORE', score, "difficulty:", difficulty);

  return {
    type: DECREMENT_SCORE,
    score: score,
    difficulty: difficulty,
  }
}

export {
  CHANGE_SCORE,
  DECREMENT_SCORE,
  INCREMENT_SCORE,
  FETCH_QUESTION,
  QUESTION_SELECTED,
}
