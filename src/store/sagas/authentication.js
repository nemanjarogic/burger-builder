import { put, call, delay } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* signOutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.completeSignOutUser());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.signOutUser());
}
