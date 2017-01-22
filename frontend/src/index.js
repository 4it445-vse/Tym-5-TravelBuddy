import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { containerReducer } from './reducers';
import {userLoggedInAction} from "./actions";


// Main entry point of the Application
// Rendering of the app starts here

let store = createStore(containerReducer,applyMiddleware(thunk));
console.log('--- STATES', store.getState());
let accessToken = localStorage.getItem('accessToken');
let userId = localStorage.getItem('userId');
if (accessToken && userId) {
  store.dispatch(userLoggedInAction(accessToken, userId));
}

ReactDOM.render(<App store={store}/>,  document.getElementById('root'));
