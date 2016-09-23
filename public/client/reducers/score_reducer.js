'use strict';

import { INCREMENT_SCORE, CHANGE_SCORE, DECREMENT_SCORE } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case CHANGE_SCORE:
    if(action.score || action.score===0){
      console.log("Here's the current score:", action.score);
      return action.score;
    } 
    case INCREMENT_SCORE: 
      return action.score + action.difficulty;
    case DECREMENT_SCORE:
      return action.score - action.difficulty;
  }
  return state;
}
