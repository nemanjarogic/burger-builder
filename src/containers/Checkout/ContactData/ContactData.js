import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

import styles from "./ContactData.module.css";

class ContactData extends Component {
  constructor(props) {
    super(props);

    const zipCodeValidation = {
      isRequired: true,
      minLength: 3,
      maxLength: 8,
      validationMessage: "Zip Code must be between 3 and 8 characters!"
    };

    this.state = {
      name: "",
      email: "",
      address: {
        street: "",
        postalCode: ""
      },
      orderForm: {
        name: this.initInputProperty("text", "Your Name"),
        street: this.initInputProperty("text", "Street"),
        zipCode: this.initInputProperty("text", "Zip Code", zipCodeValidation),
        country: this.initInputProperty("text", "Country"),
        email: this.initInputProperty("text", "Your E-mail"),
        deliveryMethod: this.initSelectProperty(["fastest", "cheapest"])
      },
      isFormValid: false
    };
  }

  initInputProperty = (
    elementType,
    placeholder,
    validation = {
      isRequired: true,
      validationMessage: "Please enter a value!"
    }
  ) => {
    return {
      elementType: "input",
      elementConfig: {
        type: elementType,
        placeholder: placeholder
      },
      value: "",
      validation: validation,
      isValid: false,
      isModifiedByUser: false
    };
  };

  initSelectProperty = selectOptions => {
    const options = selectOptions.map(item => {
      return {
        value: item,
        displayValue: item.charAt(0).toUpperCase() + item.slice(1)
      };
    });

    return {
      elementType: "select",
      elementConfig: {
        options
      },
      value: options[0].value,
      validation: {},
      isValid: true
    };
  };

  inputChangedHandler = (event, inputId) => {
    //Spread operator doesn't clone object deeply (on every level)
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    //We want to change just value property, so this is enough
    //If there is need to update elementConfig property for example we must clone that object again
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isModifiedByUser = true;
    updatedFormElement.isValid = this.checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputId] = updatedFormElement;

    let isFormValid = true;
    for (let inputId in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputId].isValid && isFormValid;
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
  };

  checkInputValidity = (value, rules) => {
    let isValid = true;
    if (rules.isRequired) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  submitOrderHandler = event => {
    event.preventDefault();

    const userFormData = {};
    for (let formElementId in this.state.orderForm) {
      userFormData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: userFormData,
      userId: this.props.userId
    };
    this.props.submitBurgerOrder(order, this.props.token);
  };

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.submitOrderHandler}>
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
              this.inputChangedHandler(event, formElement.id)
            }
          />
        ))}

        <Button
          btnType="Success"
          clicked={this.submitOrderHandler}
          disabled={!this.state.isFormValid}
        >
          ORDER
        </Button>
      </form>
    );

    if (this.props.isOrderConfirmationProcessing) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isOrderConfirmationProcessing: state.order.isOrderConfirmationProcessing,
    token: state.authentication.token,
    userId: state.authentication.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitBurgerOrder: (orderData, token) =>
      dispatch(actions.purchaseBurgerRequestedByUser(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
