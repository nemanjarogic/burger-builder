import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  signOutSaga,
  checkSessionTimeoutSaga,
  signInOrRegisterUserSaga,
  checkInitSessionStateSaga
} from "./authentication";

export function* watchAuthentication() {
  yield all([
    takeEvery(actionTypes.AUTH_INIT_SIGN_OUT, signOutSaga),
    takeEvery(actionTypes.AUTH_CHECK_SESSION_TIMEOUT, checkSessionTimeoutSaga),
    takeEvery(actionTypes.AUTH_SIGN_IN_REGISTER, signInOrRegisterUserSaga),
    takeEvery(
      actionTypes.AUTH_CHECK_INIT_SESSION_STATE,
      checkInitSessionStateSaga
    )
  ]);
}
