'use strict';

import axios from 'axios';

export function selectQuestion(question) {
  return {
    type: 'QUESTION_SELECTED',
    payload: question
  };
}

export const FETCH_QUESTION = 'FETCH_QUESTION';

export function fetchQuestion(){
  const request = axios.get('/api/questions')
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });

  return {
    type: FETCH_QUESTION,
    payload:request
  };
}
