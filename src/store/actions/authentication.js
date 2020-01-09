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

export const signOutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: actionTypes.AUTHENTICATION_SIGN_OUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(signOutUser());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTHENTICATION_REDIRECT_PATH,
    path
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(signOutUser());
      return;
    }

    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      dispatch(authSucceeded(token, localStorage.getItem("userId")));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      dispatch(signOutUser());
    }
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
      const tokenExpirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", tokenExpirationDate);
      localStorage.setItem("userId", response.data.localId);

      dispatch(authSucceeded(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      dispatch(authFailed(err.response.data.error));
    });
};
