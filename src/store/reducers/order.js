import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  isOrderConfirmationProcessing: false,
  isOrderPurchased: false
};

const purchaseBurgerStarted = (state, action) => {
  return updateObject(state, { isOrderConfirmationProcessing: true });
};

const purchaseBurgerSucceeded = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    isOrderConfirmationProcessing: false,
    isOrderPurchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, { isOrderConfirmationProcessing: false });
};

const initPurchasingInfo = (state, action) => {
  return updateObject(state, { isOrderPurchased: false });
};

const fetchOrdersStarted = (state, action) => {
  return updateObject(state, { isLoading: true });
};

const fetchOrdersSucceeded = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    isLoading: false
  });
};

const fetchOrdersFailed = (state, action) => {
  return updateObject(state, { isLoading: false });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_STARTED:
      return purchaseBurgerStarted(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCEEDED:
      return purchaseBurgerSucceeded(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case actionTypes.INIT_PURCHASING_INFO:
      return initPurchasingInfo(state, action);
    case actionTypes.FETCH_ORDERS_STARTED:
      return fetchOrdersStarted(state, action);
    case actionTypes.FETCH_ORDERS_SUCCEEDED:
      return fetchOrdersSucceeded(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    default:
      return state;
  }
};

export default orderReducer;
