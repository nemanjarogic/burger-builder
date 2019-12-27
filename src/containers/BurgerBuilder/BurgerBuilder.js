import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/";

class BurgerBuilder extends Component {
  state = {
    isPurchasingInitiated: false
  };

  componentDidMount() {
    this.props.initIngredients();
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
    let burger = this.props.isInError ? (
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isInError: state.burgerBuilder.isInError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientType =>
      dispatch(burgerBuilderActions.addIngredient(ingredientType)),
    onIngredientRemoved: ingredientType =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientType)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
