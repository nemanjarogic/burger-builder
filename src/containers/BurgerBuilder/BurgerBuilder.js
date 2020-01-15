import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../axios-orders";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/";

const BurgerBuilder = props => {
  const [isPurchasingInitiated, setIsPurchasingInitiated] = useState(false);

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const isInError = useSelector(state => state.burgerBuilder.isInError);
  const isUserAuthenticated = useSelector(
    state => state.authentication.token !== null
  );

  const dispatch = useDispatch();

  const onIngredientAdded = ingredientType =>
    dispatch(actions.addIngredient(ingredientType));
  const onIngredientRemoved = ingredientType =>
    dispatch(actions.removeIngredient(ingredientType));
  const initPurchasingInfo = () => dispatch(actions.initPurchasingInfo());
  const setAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path));

  const initIngredients = useCallback(() => {
    dispatch(actions.initIngredients());
  }, [dispatch]);

  useEffect(() => {
    initIngredients();
  }, [initIngredients]);

  const isBurgerPurchasable = () => {
    const ingredientsPrice = Object.keys(ingredients)
      .map(ingredientType => {
        return ingredients[ingredientType];
      })
      .reduce((sum, price) => {
        return sum + price;
      }, 0);

    return ingredientsPrice > 0;
  };

  const startOrderHandler = () => {
    if (isUserAuthenticated) {
      setIsPurchasingInitiated(true);
      return;
    }

    setAuthRedirectPath("/checkout");
    props.history.push("/auth");
  };

  const cancelOrderHandler = () => {
    setIsPurchasingInitiated(false);
  };

  const continueOrderHandler = () => {
    initPurchasingInfo();
    props.history.push("checkout");
  };

  const ingredientAddedInfo = {
    ...ingredients
  };
  for (let type in ingredientAddedInfo) {
    ingredientAddedInfo[type] = ingredientAddedInfo[type] > 0;
  }

  let orderSummary = null;
  let burger = isInError ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAddedToBurger={onIngredientAdded}
          ingredientRemovedFromBurger={onIngredientRemoved}
          ingredientAddedInfo={ingredientAddedInfo}
          isPurchasable={isBurgerPurchasable()}
          price={totalPrice}
          startOrderHandler={startOrderHandler}
          isUserAuthenticated={isUserAuthenticated}
        />
      </Fragment>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        orderCanceled={cancelOrderHandler}
        orderContinued={continueOrderHandler}
        price={totalPrice}
      />
    );
  }

  return (
    <Fragment>
      <Modal
        isModalVisible={isPurchasingInitiated}
        closeModalHandler={cancelOrderHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
