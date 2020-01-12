import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import SignOut from "./containers/Authentication/SignOut/SignOut";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuthentication = asyncComponent(() => {
  return import("./containers/Authentication/Authentication");
});

class App extends Component {
  componentDidMount() {
    this.props.checkInitSessionState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuthentication} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isUserAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/signout" component={SignOut} />
          <Route path="/auth" component={asyncAuthentication} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: state.authentication.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkInitSessionState: () => dispatch(actions.checkInitSessionState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
