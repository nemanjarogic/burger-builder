import React, { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import styles from "./ContactData.module.css";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: {
        street: "",
        postalCode: ""
      },
      isOrderConfirmationProcessing: false,
      totalPrice: 0,
      orderForm: {
        name: this.initInputProperty("text", "Your Name"),
        street: this.initInputProperty("text", "Street"),
        zipCode: this.initInputProperty("text", "Zip Code"),
        country: this.initInputProperty("text", "Country"),
        email: this.initInputProperty("text", "Your E-mail"),
        deliveryMethod: this.initSelectProperty(["fastest", "cheapest"])
      }
    };
  }

  initInputProperty = (elementType, placeholder, initialValue = "") => {
    return {
      elementType: "input",
      elementConfig: {
        type: elementType,
        placeholder: placeholder
      },
      value: initialValue
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
      value: ""
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
    updatedOrderForm[inputId] = updatedFormElement;

    this.setState({ orderForm: updatedOrderForm });
  };

  submitOrderHandler = event => {
    event.preventDefault();

    this.setState({ isOrderConfirmationProcessing: true });

    const userFormData = {};
    for (let formElementId in this.state.orderForm) {
      userFormData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: userFormData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          isOrderConfirmationProcessing: false
        });
        this.props.history.push("/");
      })
      .catch(error =>
        this.setState({
          isOrderConfirmationProcessing: false
        })
      );
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
            inputChangedHandler={event =>
              this.inputChangedHandler(event, formElement.id)
            }
          />
        ))}

        <Button btnType="Success" clicked={this.submitOrderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.isOrderConfirmationProcessing) {
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

export default ContactData;
