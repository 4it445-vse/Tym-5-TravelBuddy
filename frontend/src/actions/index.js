import api from '../api.js';
import { browserHistory } from 'react-router';

//list of all action types

export const ACTION_TYPE_LOGGED_IN = 'ACTION_TYPE_LOGGED_IN';
export const ACTION_TYPE_LOG_OUT = 'ACTION_TYPE_LOG_OUT';
export const ACTION_TYPE_LOG_IN_FAILED = 'ACTION_TYPE_LOG_IN_FAILED';

//implement actions

export const userLoggedInAction = (accessToken, userId) => {
  //store access token in localStorage
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('userId', userId);

  return {
    type: ACTION_TYPE_LOGGED_IN,
    accessToken: accessToken,
    userId: userId
  };
};

export const userLoginFailedAction = () => {
  return {
    type: ACTION_TYPE_LOG_IN_FAILED
  };
};

export const loginAction = (email, password) => (dispatch) => {

  if (password==="" || email===""){
    console.log("empty values");
    return;
  }
  var bcrypt = require('bcryptjs');
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    if (!err){
      //TODO!!!!! USE "password":hash
      api.post('/UserMain/login', {"email":email, "password":password})
      .then((response) => {
        // console.log('--- loginAction', response.data);
        // console.log('--- loginAction', response.status);
        if (response.status === 200){
          var userId = response.data.userId;
          var token = response.data.id;
          dispatch(userLoggedInAction(token, userId));
          browserHistory.push('/');
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Error: ", error.response);
        dispatch(userLoginFailedAction());
      });

    }
  });
};

export const logoutAction = () => {
  api.post("/UserMain/logout?access_token="+localStorage.getItem("accessToken"));
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId')
  browserHistory.push('/');
  return {
    type : ACTION_TYPE_LOG_OUT
  }
};
