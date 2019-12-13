import React, { Component, Fragment } from "react";

import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    isPurchasable: false,
    isPurchasingInitiated: false
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];

    this.setState(prevState => ({
      totalPrice: prevState.totalPrice + priceAddition,
      ingredients: updatedIngredients,
      isPurchasable: true
    }));
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];

    this.setState(prevState => ({
      totalPrice: prevState.totalPrice - priceDeduction,
      ingredients: updatedIngredients
    }));
    this.updateIsPurchasableState(updatedIngredients);
  };

  updateIsPurchasableState = ingredients => {
    const ingredientsPrice = Object.keys(ingredients)
      .map(ingredientType => {
        return ingredients[ingredientType];
      })
      .reduce((sum, price) => {
        return sum + price;
      }, 0);

    this.setState({ isPurchasable: ingredientsPrice > 0 });
  };

  startOrderHandler = () => {
    this.setState({ isPurchasingInitiated: true });
  };

  cancelOrderHandler = () => {
    this.setState({ isPurchasingInitiated: false });
  };

  continueOrderHandler = () => {
    alert("Purchase is continued...");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Modal
          isModalVisible={this.state.isPurchasingInitiated}
          closeModalHandler={this.cancelOrderHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            orderCanceled={this.cancelOrderHandler}
            orderContinued={this.continueOrderHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAddedToBurger={this.addIngredientHandler}
          ingredientRemovedFromBurger={this.removeIngredientHandler}
          disabled={disabledInfo}
          isPurchasable={this.state.isPurchasable}
          price={this.state.totalPrice}
          startOrderHandler={this.startOrderHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
