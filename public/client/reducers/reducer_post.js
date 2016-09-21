'use strict';

import { FETCH_QUESTION } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_QUESTION:
    if(action.payload.data){
      console.log("this is reducer post", action.payload.data);
      return action.payload.data;
    } else {
      console.log("Loading");
    }
  }
    return state;
}
