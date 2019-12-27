import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerStarted = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_STARTED
  };
};

export const purchaseBurgerSucceeded = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCEEDED,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const purchaseBurgerRequested = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStarted());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurgerSucceeded(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};
