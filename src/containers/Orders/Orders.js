import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios-orders";

import * as actions from "../../store/actions/";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Orders = () => {
  const orders = useSelector(state => state.order.orders);
  const isLoading = useSelector(state => state.order.isLoading);
  const token = useSelector(state => state.authentication.token);
  const userId = useSelector(state => state.authentication.userId);
  const dispatch = useDispatch();

  const fetchOrders = useCallback(() => {
    dispatch(actions.fetchOrders(token, userId));
  }, [dispatch, token, userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  let ordersPresentation = <Spinner />;
  if (!isLoading) {
    ordersPresentation = orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }

  return <div>{ordersPresentation}</div>;
};

export default withErrorHandler(Orders, axios);
