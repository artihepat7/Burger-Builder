import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENTS_PRICE = {
  Salad: 0.5,
  Bacon: 1,
  Cheese: 1.5,
  Meat: 2,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
      };

    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredientName,
      };

    case actionTypes.FETCH_INFREDIENTS_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
