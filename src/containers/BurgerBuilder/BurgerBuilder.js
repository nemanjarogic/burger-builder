import React, { Component, Fragment } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    isPurchasingInitiated: false,
    isOrderConfirmationProcessing: false,
    isInError: false
  };

  componentDidMount() {
    /*axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ isInError: true });
      });*/
  }

  isBurgerPurchasable = () => {
    const ingredientsPrice = Object.keys(this.props.ingredients)
      .map(ingredientType => {
        return this.props.ingredients[ingredientType];
      })
      .reduce((sum, price) => {
        return sum + price;
      }, 0);

    return ingredientsPrice > 0;
  };

  startOrderHandler = () => {
    this.setState({ isPurchasingInitiated: true });
  };

  cancelOrderHandler = () => {
    this.setState({ isPurchasingInitiated: false });
  };

  continueOrderHandler = () => {
    this.props.history.push("checkout");
  };

  render() {
    const ingredientAddedInfo = {
      ...this.props.ingredients
    };
    for (let type in ingredientAddedInfo) {
      ingredientAddedInfo[type] = ingredientAddedInfo[type] > 0;
    }

    let orderSummary = null;
    let burger = this.state.isInError ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAddedToBurger={this.props.onIngredientAdded}
            ingredientRemovedFromBurger={this.props.onIngredientRemoved}
            ingredientAddedInfo={ingredientAddedInfo}
            isPurchasable={this.isBurgerPurchasable()}
            price={this.props.totalPrice}
            startOrderHandler={this.startOrderHandler}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          orderCanceled={this.cancelOrderHandler}
          orderContinued={this.continueOrderHandler}
          price={this.props.totalPrice}
        />
      );
    }

    if (this.state.isOrderConfirmationProcessing) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          isModalVisible={this.state.isPurchasingInitiated}
          closeModalHandler={this.cancelOrderHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientType =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingredientType
      }),
    onIngredientRemoved: ingredientType =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingredientType
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
