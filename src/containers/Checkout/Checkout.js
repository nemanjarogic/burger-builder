import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let checkoutSummary = <Redirect to="/" />;
    if (this.props.ingredients) {
      checkoutSummary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelledHandler={this.checkoutCancelledHandler}
            checkoutContinuedHandler={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return checkoutSummary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
