import * as actionTypes from "./actionTypes";
import axios from "../../axios.orders";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

export const setIngredient = (ingName) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredientName: ingName,
  };
};

export const setIngredient_error = (error) => {
  return {
    type: actionTypes.FETCH_INFREDIENTS_FAILED,
    error: error,
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get("https://react-my-burger-d44ac.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredient(response.data));
      })
      .catch((error) => {
        dispatch(setIngredient_error(error));
      });
  };
};
