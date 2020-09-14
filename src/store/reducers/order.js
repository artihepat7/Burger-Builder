import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.ORDER_POST_SUCCESS:
      const newOrder = {
        ...action.order,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
      };

    case actionTypes.ORDER_POST_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.order,
        loading: false,
      };

    case actionTypes.FETCH_ORDER_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true,
      };

    default: {
      return state;
    }
  }
};

export default reducer;
