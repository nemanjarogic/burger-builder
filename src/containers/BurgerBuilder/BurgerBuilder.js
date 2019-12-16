import React, { Component, Fragment } from "react";
import axios from "../../axios-orders";

import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
    isPurchasingInitiated: false,
    isOrderConfirmationProcessing: false,
    isInError: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ isInError: true });
      });
  }

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
    this.setState({ isOrderConfirmationProcessing: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Nemanja Rogic",
        address: {
          street: "Test",
          zipCode: "21000",
          coutnry: "Serbia"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response =>
        this.setState({
          isOrderConfirmationProcessing: false,
          isPurchasingInitiated: false
        })
      )
      .catch(error =>
        this.setState({
          isOrderConfirmationProcessing: false,
          isPurchasingInitiated: false
        })
      );
  };

  render() {
    const ingredientAddedInfo = {
      ...this.state.ingredients
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

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAddedToBurger={this.addIngredientHandler}
            ingredientRemovedFromBurger={this.removeIngredientHandler}
            ingredientAddedInfo={ingredientAddedInfo}
            isPurchasable={this.state.isPurchasable}
            price={this.state.totalPrice}
            startOrderHandler={this.startOrderHandler}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          orderCanceled={this.cancelOrderHandler}
          orderContinued={this.continueOrderHandler}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
