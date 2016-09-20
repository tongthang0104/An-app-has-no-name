'use strict';

import { FETCH_QUESTION } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_QUESTION:
      return { ...state, all: action.payload.data };
  }
    return state;
}
