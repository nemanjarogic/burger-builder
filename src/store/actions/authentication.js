import * as actionTypes from "./actionTypes";
import axios from "axios";

const firebaseApiKey = "";

export const authStarted = () => {
  return {
    type: actionTypes.AUTHENTICATION_STARTED
  };
};

export const authSucceeded = (token, userId) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCEEDED,
    token,
    userId
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTHENTICATION_FAILED,
    error
  };
};

export const registerUser = (email, password) => {
  return dispatch => {
    dispatch(authStarted());

    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`;
    handleFirebaseAuthRequest(email, password, apiUrl, dispatch);
  };
};

export const signInUser = (email, password) => {
  return dispatch => {
    dispatch(authStarted());

    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;
    handleFirebaseAuthRequest(email, password, apiUrl, dispatch);
  };
};

const handleFirebaseAuthRequest = (email, password, apiUrl, dispatch) => {
  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  axios
    .post(apiUrl, authData)
    .then(response => {
      console.log("User authentication succeeded.");
      console.log(response);
      dispatch(authSucceeded(response.data.idToken, response.data.localId));
    })
    .catch(err => {
      console.log("Failed to authenthicate user.");
      console.log(err);
      dispatch(authFailed(err));
    });
};
