'use strict';

import { FETCH_QUESTION } from '../actions/index';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_QUESTION:
      console.log(action);
    if(action.payload.data){
      console.log('HERE IS QUESTIONS');
      return action.payload.data;
    }
    // if(action.categories){
    //   console.log('Here is categories');
    //   console.log(action.categories);
    //   return action.categories;
    // }
  }
    return state;
}
