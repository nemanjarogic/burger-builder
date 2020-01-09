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

export const purchaseBurgerRequestedByUser = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStarted());
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSucceeded(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const initPurchasingInfo = () => {
  return {
    type: actionTypes.INIT_PURCHASING_INFO
  };
};

export const fetchOrdersStarted = () => {
  return {
    type: actionTypes.FETCH_ORDERS_STARTED
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStarted());
    axios
      .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }

        dispatch(fetchOrdersSucceed(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};

export const fetchOrdersSucceed = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCEEDED,
    orders: orders
  };
};

export const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  };
};
