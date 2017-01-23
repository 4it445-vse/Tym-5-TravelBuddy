/*
Things you should never do inside a reducer:

Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random().
*/

import {
  BOOKING_START_BOOKING,
  BOOKING_CANCEL_BOOKING,
  BOOKING_CREATE_TRANSACTION,
  BOOKING_DECLINE_REQUEST_TRANSACTION,
  BOOKING_ACCEPT_REQUEST_TRANSACTION,
  BOOKING_CANCEL_REQUEST_TRANSACTION,
  BOOKING_DEACTIVATE_PRODUCT,
  BOOKING_ACTIVATE_PRODUCT
} from "./actions.js";

const initialState = {
  product: null,
  productId: null,
  owner: null,
  ownerId: null,
  userId: null,
  requestDate: null,
  transaction: null,
  acceptedTxn: null,
  declinedTxn: null,
  productState: null,
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
    case BOOKING_DECLINE_REQUEST_TRANSACTION:
      return {
        ...state,
        transaction: action.transaction,
        declinedTxn: action.transaction
      };
    case BOOKING_ACCEPT_REQUEST_TRANSACTION:
      return {
        ...state,
        transaction: action.transaction,
        productId: action.transaction.refProductId,
        productState: "accepted",
        acceptedTxn: action.transaction
      };
    case BOOKING_CANCEL_REQUEST_TRANSACTION:
      return {
        ...state,
        productState: action.productState
      }
    case BOOKING_DEACTIVATE_PRODUCT:
      return {
        ...state,
        productState: action.productState
      };
    case BOOKING_ACTIVATE_PRODUCT:
      return {
        ...state,
        productState: action.productState
      };
    default:
      return state;
  }
}

export default bookingReducer
