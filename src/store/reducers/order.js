import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  isOrderConfirmationProcessing: false,
  isOrderPurchased: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_STARTED:
      return {
        ...state,
        isOrderConfirmationProcessing: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCEEDED:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };

      return {
        ...state,
        isOrderConfirmationProcessing: false,
        isOrderPurchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        isOrderConfirmationProcessing: false
      };
    case actionTypes.INIT_PURCHASING_INFO:
      return {
        ...state,
        isOrderPurchased: false
      };
    case actionTypes.FETCH_ORDERS_STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCEEDED:
      return {
        ...state,
        orders: action.orders,
        isLoading: false
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default orderReducer;
