import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    ingredientType => {
      return (
        <li key={ingredientType}>
          <span style={{ textTransform: "capitalize" }}>{ingredientType}</span>:{" "}
          {props.ingredients[ingredientType]}
        </li>
      );
    }
  );

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>
          Total Price:
          {props.price.toFixed(2)}
        </strong>
      </p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={props.orderCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.orderContinued}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
