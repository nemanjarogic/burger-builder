import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { signOutSaga, checkAuthTimeoutSaga } from "./authentication";

export function* watchAuthentication() {
  yield all([
    takeEvery(actionTypes.AUTH_INIT_SIGN_OUT, signOutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  ]);
}
