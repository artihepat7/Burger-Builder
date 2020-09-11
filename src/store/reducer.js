import * as actionTypes from "./action";

const initialState = {
  ingredients: { Salad: 0, Bacon: 0, Cheese: 0, Meat: 0 },
  totalPrice: 4,
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
    default:
      return state;
  }
};
export default reducer;
