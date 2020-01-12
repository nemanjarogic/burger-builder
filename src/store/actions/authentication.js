import * as actionTypes from "./actionTypes";

export const authStarted = () => {
  return {
    type: actionTypes.AUTH_STARTED
  };
};

export const authSucceeded = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCEEDED,
    token,
    userId
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  };
};

export const registerUser = (email, password) => {
  return {
    type: actionTypes.AUTH_SIGN_IN_REGISTER,
    apiUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    email,
    password
  };
};

export const signInUser = (email, password) => {
  return {
    type: actionTypes.AUTH_SIGN_IN_REGISTER,
    apiUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    email,
    password
  };
};

export const signOutUser = () => {
  return {
    type: actionTypes.AUTH_INIT_SIGN_OUT
  };
};

export const completeSignOutUser = () => {
  return {
    type: actionTypes.AUTH_COMPLETE_SIGN_OUT
  };
};

export const checkSessionTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_SESSION_TIMEOUT,
    expirationTime
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTHENTICATION_REDIRECT_PATH,
    path
  };
};

export const checkInitSessionState = () => {
  return {
    type: actionTypes.AUTH_CHECK_INIT_SESSION_STATE
  };
};
