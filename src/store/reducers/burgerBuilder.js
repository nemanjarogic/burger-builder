import * as actionTypes from "../actions/actionTypes";

const initialBurgerPrice = 4;

const initialState = {
  ingredients: null,
  totalPrice: initialBurgerPrice,
  isInError: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          //define correct order of ingredients
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        isInError: false,
        totalPrice: initialBurgerPrice
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        isInError: true
      };
    default:
      return state;
  }
};

export default reducer;
