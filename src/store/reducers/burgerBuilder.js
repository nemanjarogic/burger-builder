import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialBurgerPrice = 4;

const initialState = {
  ingredients: null,
  totalPrice: initialBurgerPrice,
  isInError: false,
  isBurgerBuildingStarted: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const updateIngredientAndPrice = (isIngredientAdded, ingredientType, state) => {
  let ingredientCount, updatedPrice;
  if (isIngredientAdded) {
    ingredientCount = state.ingredients[ingredientType] + 1;
    updatedPrice = state.totalPrice + INGREDIENT_PRICES[ingredientType];
  } else {
    ingredientCount = state.ingredients[ingredientType] - 1;
    updatedPrice = state.totalPrice - INGREDIENT_PRICES[ingredientType];
  }

  const updatedIngredient = { [ingredientType]: ingredientCount };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: updatedPrice,
    isBurgerBuildingStarted: true
  };

  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      //define correct order of ingredients
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    isInError: false,
    totalPrice: initialBurgerPrice,
    isBurgerBuildingStarted: false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { isInError: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateIngredientAndPrice(true, action.ingredientType, state);
    case actionTypes.REMOVE_INGREDIENT:
      return updateIngredientAndPrice(false, action.ingredientType, state);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
