import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false
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

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_STARTED:
      return authStarted(state, action);
    case actionTypes.AUTHENTICATION_SUCCEEDED:
      return authSucceeded(state, action);
    case actionTypes.AUTHENTICATION_FAILED:
      return authFailed(state, action);
    default:
      return state;
  }
};

export default authenticationReducer;
