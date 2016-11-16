/*
Things you should never do inside a reducer:

Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random().
*/

import { ACTION_TYPE_LOGGED_IN, ACTION_TYPE_LOG_IN_FAILED,ACTION_TYPE_LOG_OUT} from "../actions";

const initialState = {
  accessToken: null,
  userId: null,
  userLoggedIn: false,
  statusText: null
}

const authentificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE_LOGGED_IN:
      return {
        ...state,
        accessToken: action.accessToken,
        userId: action.userId,
        userLoggedIn: true,
        statusText: null
      };

    case ACTION_TYPE_LOG_IN_FAILED:
      return {
        ...state,
        statusText: "Invalid login email or password"
      }

    case ACTION_TYPE_LOG_OUT:
      return {
        ...state,
        accessToken: null,
        userId: null,
        userLoggedIn: false,
        statusText: null
      }
    default:
      return state;
  }
}

export default authentificationReducer
