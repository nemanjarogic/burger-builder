import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientType => {
      return [...Array(props.ingredients[ingredientType])].map((_, index) => {
        return (
          <BurgerIngredient
            key={ingredientType + index}
            type={ingredientType}
          />
        );
      });
    })
    .reduce((arr, el) => {
      //flatter the array
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default Burger;
