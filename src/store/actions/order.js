import * as actionTypes from "./actionTypes";
import axios from "../../axios.orders";

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const postOrderSuccess = (id, data) => {
  return {
    type: actionTypes.ORDER_POST_SUCCESS,
    orderId: id,
    order: data,
  };
};
export const postOrderFail = (error) => {
  return {
    type: actionTypes.ORDER_POST_FAILED,
    error: error,
  };
};

export const loading = () => {
  return {
    type: actionTypes.LOADING,
  };
};

export const postOrderStart = (order) => {
  const postOrder = {
    ...order,
  };
  console.log(postOrder);
  return (dispatch) => {
    dispatch(loading());
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response.data);
        dispatch(postOrderSuccess(response.data.name, order));
      })
      .catch((error) => {
        dispatch(postOrderFail(error));
      });
  };
};

export const fetchBurgerSuccess = (fetchedOrder) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    order: fetchedOrder,
  };
};

export const fetchBurgerFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error: error,
  };
};

export const fetchBurgerStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchBurger = () => {
  return (dispatch) => {
    dispatch(fetchBurgerStart());
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        console.log(fetchedOrders);
        dispatch(fetchBurgerSuccess(fetchedOrders));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchBurgerFailed(error));
      });
  };
};
