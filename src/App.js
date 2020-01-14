import React, { useEffect, useCallback, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import SignOut from "./containers/Authentication/SignOut/SignOut";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const Authentication = React.lazy(() => {
  return import("./containers/Authentication/Authentication");
});

const App = () => {
  const isUserAuthenticated = useSelector(
    state => state.authentication.token !== null
  );
  const dispatch = useDispatch();

  const checkInitSessionState = useCallback(() => {
    dispatch(actions.checkInitSessionState());
  }, [dispatch]);

  useEffect(() => {
    checkInitSessionState();
  }, [checkInitSessionState]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Authentication {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isUserAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/signout" component={SignOut} />
        <Route path="/auth" render={props => <Authentication {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
