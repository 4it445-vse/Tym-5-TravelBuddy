import api from '../../api.js';
import { browserHistory } from 'react-router';

//list of all action types

export const BOOKING_START_BOOKING = 'BOOKING_START_BOOKING';
export const BOOKING_CANCEL_BOOKING = 'BOOKING_CANCEL_BOOKING';
export const BOOKING_CREATE_TRANSACTION = 'BOOKING_CREATE_TRANSACTION';

//implement actions

export const startBookingAction = (product, owner) => {
  browserHistory.push('/booking');
  return {
    type: BOOKING_START_BOOKING,
    product: product,
    owner: owner
  }
}

export const cancelBookingAction = () => {
  browserHistory.push('/search');
  return {
    type: BOOKING_CANCEL_BOOKING,
  }
}

export const createTransactionAction = (productId, ownerId, userId, requestDate) => {
  let statusText = "";
  let data = {
    Status: "open",
    Date: requestDate,
    refBuddyUserId: ownerId,
    refUserId: userId,
    refProductId: productId,
    Notes: ""
  };
  api.post('/Transactions?access_token=' + localStorage.accessToken, data).then(response => {
    console.log('--- txn created');
    statusText = "Transaction sent!"
  }).catch((error) => {
    console.log('<!> post txn failed');
    statusText = "Transaction failed!";
  });
  return {
    type: BOOKING_CREATE_TRANSACTION,
    productId: productId,
    ownerId: ownerId,
    userId: userId,
    statusText: statusText
  }
}
