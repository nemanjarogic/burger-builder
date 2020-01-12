import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import burgerBuilderReducer from "./reducers/burgerBuilder";
import orderReducer from "./reducers/order";
import authenticationReducer from "./reducers/authentication";
import { watchAuthentication } from "./sagas/index";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  authentication: authenticationReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuthentication);

export default store;
