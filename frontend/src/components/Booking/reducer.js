/*
Things you should never do inside a reducer:

Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random().
*/

import {
  BOOKING_START_BOOKING,
  BOOKING_CANCEL_BOOKING,
  BOOKING_CREATE_TRANSACTION
} from "./actions.js";

const initialState = {
  product: null,
  owner: null,
  ownerId: null,
  userId: null,
  productId: null,
  requestDate: null,
  statusText: null
}

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_START_BOOKING:
      return {
        ...state,
        product: action.product,
        owner: action.owner,
        statusText: null
      };
    case BOOKING_CANCEL_BOOKING:
      return {
        ...state,
        initialState
      };
    case BOOKING_CREATE_TRANSACTION:
      return {
        ...state,
        productId: action.productId,
        ownerId: action.ownerId,
        userId: action.userId,
        requestDate: action.requestDate,
        statusText: action.statusText
      };
    default:
      return state;
  }
}

export default bookingReducer
