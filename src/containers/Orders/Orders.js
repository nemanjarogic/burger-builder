import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";

import * as actions from "../../store/actions/";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  };

  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.isLoading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.authentication.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: token => dispatch(actions.fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
