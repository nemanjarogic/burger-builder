import React from "react";
import PropTypes from "prop-types";
import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

const ingredientControls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => (
  <div className={styles.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {ingredientControls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        ingredientAddedToBurger={() => props.ingredientAddedToBurger(ctrl.type)}
        ingredientRemovedFromBurger={() =>
          props.ingredientRemovedFromBurger(ctrl.type)
        }
        isIngredientAdded={props.ingredientAddedInfo[ctrl.type]}
      />
    ))}
    <button
      disabled={!props.isPurchasable}
      className={styles.OrderButton}
      onClick={props.startOrderHandler}
    >
      {props.isUserAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
);

BuildControls.propTypes = {
  isPurchasable: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired
};

export default BuildControls;
