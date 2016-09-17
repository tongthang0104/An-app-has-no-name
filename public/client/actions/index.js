
// export const FETCH_QUESTION = 'FETCH_QUESTION';

// export function fetchQuestion(){
//   // const request = axios.get{`${ROOT_URL}/`};
//
//   return {
//     type: FETCH_QUESTION,
//     payload:request
//   };
// }
'use strict';

export function selectQuestion(question) {
  console.log(question);
  return {
    type: 'QUESTION_SELECTED',
    payload: question
  };
}
