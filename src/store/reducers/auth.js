import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tokenId: null,
  authId: null,

  error: null,
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        authId: action.authId,
        tokenId: action.tokenId,
        loading: false,
        error: null,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,

        loading: false,
        isSignUp: false,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        tokenId: null,
        authId: null,
      };

    default:
      return state;
  }
};

export default reducer;
