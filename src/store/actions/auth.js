import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authSuccess = (id, tokenID) => {
  //console.log(response);
  return {
    type: actionTypes.AUTH_SUCCESS,
    authId: id,
    tokenId: tokenID,
  };
};
export const authFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (email, password, isSignUp) => {
  console.log(email, password);
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  return (dispatch) => {
    dispatch(authStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmudCYxWluJNM8xtK6Y5-vpyFRKuajJV8";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmudCYxWluJNM8xtK6Y5-vpyFRKuajJV8";
    }

    axios
      .post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data.localId, response.data.idToken));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => dispatch(authFail(error.response.data.error)));
  };
};
