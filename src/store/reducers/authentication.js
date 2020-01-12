import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
  authRedirectPath: "/"
};

const authStarted = (state, action) => {
  return updateObject(state, {
    error: null,
    isLoading: true
  });
};

const authSucceeded = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    isLoading: false
  });
};

const authFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    isLoading: false
  });
};

const authSignOut = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTED:
      return authStarted(state, action);
    case actionTypes.AUTH_SUCCEEDED:
      return authSucceeded(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_COMPLETE_SIGN_OUT:
      return authSignOut(state, action);
    case actionTypes.SET_AUTHENTICATION_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default authenticationReducer;
