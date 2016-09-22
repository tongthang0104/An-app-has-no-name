'use strict';

import { CHANGE_SCORE } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case CHANGE_SCORE:
    if(action.score){
      console.log("Here's the current score:", action.score);
      return action.score;
    } else {
      console.log('PRINT SOMETHING');
    }
  }
  return state;
}
