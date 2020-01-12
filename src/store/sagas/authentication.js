import { put, call, delay } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

export function* signOutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.completeSignOutUser());
}

export function* checkSessionTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.signOutUser());
}

export function* signInOrRegisterUserSaga(action) {
  yield put(actions.authStarted());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  try {
    const response = yield axios.post(action.apiUrl, authData);

    const tokenExpirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", tokenExpirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(
      actions.authSucceeded(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkSessionTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}

export function* checkInitSessionStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.signOutUser());
    return;
  }

  const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
  if (expirationDate <= new Date()) {
    yield put(actions.signOutUser());
  }

  yield put(actions.authSucceeded(token, localStorage.getItem("userId")));
  yield put(
    actions.checkSessionTimeout(
      (expirationDate.getTime() - new Date().getTime()) / 1000
    )
  );
}
