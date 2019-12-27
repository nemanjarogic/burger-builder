import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  isOrderConfirmationProcessing: false
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
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        isOrderConfirmationProcessing: false
      };
    default:
      return state;
  }
};

export default orderReducer;
