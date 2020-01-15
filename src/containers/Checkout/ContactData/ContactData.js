import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import {
  initInputProperty,
  initSelectProperty
} from "../../../shared/form/formInitialization";
import {
  checkInputValidity,
  getEmailValidationRules
} from "../../../shared/form/formValidation";

import styles from "./ContactData.module.css";

const ContactData = props => {
  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const token = useSelector(state => state.authentication.token);
  const userId = useSelector(state => state.authentication.userId);
  const isOrderConfirmationProcessing = useSelector(
    state => state.order.isOrderConfirmationProcessing
  );

  const dispatch = useDispatch();

  const zipCodeValidation = {
    isRequired: true,
    minLength: 3,
    maxLength: 8,
    validationMessage: "Zip Code must be between 3 and 8 characters!"
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: initInputProperty("text", "Your Name"),
    street: initInputProperty("text", "Street"),
    zipCode: initInputProperty("text", "Zip Code", zipCodeValidation),
    country: initInputProperty("text", "Country"),
    email: initInputProperty("text", "Your E-mail", getEmailValidationRules()),
    deliveryMethod: initSelectProperty(["fastest", "cheapest"])
  });

  const inputChangedHandler = (event, inputId) => {
    //Spread operator doesn't clone object deeply (on every level)
    const updatedOrderForm = {
      ...orderForm
    };

    //We want to change just value property, so this is enough
    //If there is need to update elementConfig property for example we must clone that object again
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isModifiedByUser = true;
    updatedFormElement.isValid = checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputId] = updatedFormElement;

    let isFormValid = true;
    for (let inputId in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputId].isValid && isFormValid;
    }

    setOrderForm(updatedOrderForm);
    setIsFormValid(isFormValid);
  };

  const submitOrderHandler = event => {
    event.preventDefault();

    const userFormData = {};
    for (let formElementId in orderForm) {
      userFormData[formElementId] = orderForm[formElementId].value;
    }

    const order = {
      ingredients: ingredients,
      price: totalPrice,
      orderData: userFormData,
      userId: userId
    };
    dispatch(actions.purchaseBurgerRequestedByUser(order, token));
  };

  const formElements = [];
  for (let key in orderForm) {
    formElements.push({
      id: key,
      config: orderForm[key]
    });
  }

  let form = (
    <form onSubmit={submitOrderHandler}>
      {formElements.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          isValid={formElement.config.isValid}
          validation={formElement.config.validation}
          isModifiedByUser={formElement.config.isModifiedByUser}
          inputChangedHandler={event =>
            inputChangedHandler(event, formElement.id)
          }
        />
      ))}

      <Button
        btnType="Success"
        clicked={submitOrderHandler}
        disabled={!isFormValid}
      >
        ORDER
      </Button>
    </form>
  );

  if (isOrderConfirmationProcessing) {
    form = <Spinner />;
  }

  return (
    <div className={styles.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default withErrorHandler(ContactData, axios);
