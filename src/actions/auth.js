import Swal from "sweetalert2";
import { customFetch, customFetchToken } from "../helpers/fetch";
import { processErrorMessage } from "../helpers/processErrorMessage";
import { types } from "../types/types";

const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("token-init-date", new Date().getTime());
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const register = (user) => ({
  type: types.authStartRegister,
  payload: user,
});

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const logout = () => ({ type: types.authLogout });

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await customFetch("auth", { email, password }, "POST");
    const body = await response.json();
    if (body.ok) {
      setToken(body.token);
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", processErrorMessage(body?.errors), "error");
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const response = await customFetch(
      "auth/new",
      { name, email, password },
      "POST"
    );
    const body = await response.json();
    if (body.ok) {
      setToken(body.token);
      dispatch(
        register({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", processErrorMessage(body?.errors), "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const response = await customFetchToken("auth/renew");
    const body = await response.json();
    if (body.ok) {
      setToken(body.token);
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};
