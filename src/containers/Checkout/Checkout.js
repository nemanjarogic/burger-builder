import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let checkoutSummary = <Redirect to="/" />;
  if (props.ingredients) {
    const redirectSummary = props.isOrderPurchased ? <Redirect to="/" /> : null;

    checkoutSummary = (
      <div>
        {redirectSummary}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelledHandler={checkoutCancelledHandler}
          checkoutContinuedHandler={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return checkoutSummary;
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    isOrderPurchased: state.order.isOrderPurchased
  };
};

export default connect(mapStateToProps)(Checkout);
