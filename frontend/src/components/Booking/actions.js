import api from '../../api.js';
import { browserHistory } from 'react-router';

//list of all action types

export const BOOKING_START_BOOKING = 'BOOKING_START_BOOKING';
export const BOOKING_CANCEL_BOOKING = 'BOOKING_CANCEL_BOOKING';
export const BOOKING_CREATE_TRANSACTION = 'BOOKING_CREATE_TRANSACTION';
export const BOOKING_DECLINE_REQUEST_TRANSACTION = 'BOOKING_DECLINE_REQUEST_TRANSACTION';
export const BOOKING_ACCEPT_REQUEST_TRANSACTION = 'BOOKING_ACCEPT_REQUEST_TRANSACTION';
export const BOOKING_CANCEL_REQUEST_TRANSACTION = 'BOOKING_CANCEL_REQUEST_TRANSACTION';
export const BOOKING_DEACTIVATE_PRODUCT = 'BOOKING_DEACTIVATE_PRODUCT';
export const BOOKING_ACTIVATE_PRODUCT = 'BOOKING_ACTIVATE_PRODUCT';

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

export const declineRequestAction = (transaction) => {
  const srvUrl = '/Transactions/' + transaction.id + '?access_token=' + localStorage.accessToken;
  api.patch(srvUrl, {"Status": "declined"}).then(({data})=> {

  }).catch((error)=> {
    console.log('<!> declineRequestAction', error);
  });
  transaction = {...transaction, Status: "declined"};
  return {
    type: BOOKING_DECLINE_REQUEST_TRANSACTION,
    transaction: transaction
  }
}

export const acceptRequestAction = (transaction) => {
  //update txn
  const srvUrl = '/Transactions/' + transaction.id + '?access_token=' + localStorage.accessToken;
  api.patch(srvUrl, {"Status": "accepted"}).then(({data})=> {
    //update product state
    const srvUrl = '/Products/' + transaction.refProductId + '?access_token=' + localStorage.accessToken;
    api.patch(srvUrl, {"state": "accepted", "refTravellerUserId": transaction.refUserId}).then(({data})=> {

    }).catch((error)=> {
      console.log('<!> acceptRequestAction', error);
    });
  }).catch((error)=> {
    console.log('<!> acceptRequestAction', error);
  });
  transaction = {...transaction, Status: "accepted"};
  return {
    type: BOOKING_ACCEPT_REQUEST_TRANSACTION,
    transaction: transaction
  }
}

export const cancelRequestAction = (transaction) => {
  const srvUrl = '/Transactions/' + transaction.id + '?access_token=' + localStorage.accessToken;
  api.patch(srvUrl, {"Status": "cancelled"}).then(({data})=> {

  }).catch((error)=> {
    console.log('<!> declineRequestAction', error);
  });
  transaction = {...transaction, Status: "cancelled"};
  return {
    type: BOOKING_CANCEL_REQUEST_TRANSACTION,
    transaction: transaction
  }
}

export const deactivateProductAction = (productId) => {
  const srvUrl = '/Products/' + productId + '?access_token=' + localStorage.accessToken;
  api.patch(srvUrl, {"state": "deactivated"}).then(({data})=> {

  }).catch((error)=> {
    console.log('<!> deactivateProductAction', error);
  });
  return {
    type: BOOKING_DEACTIVATE_PRODUCT,
    productState: "deactivated",
  }
}

export const activateProductAction = (productId) => {
  const srvUrl = '/Products/' + productId + '?access_token=' + localStorage.accessToken;
  api.patch(srvUrl, {"state": "open"}).then(({data})=> {

  }).catch((error)=> {
    console.log('<!> activateProductAction', error);
  });
  return {
    type: BOOKING_ACTIVATE_PRODUCT,
    productState: "open",
  }
}
