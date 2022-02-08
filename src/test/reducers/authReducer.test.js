import { checkingFinish, login, logout, register } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
  checking: true,
};

describe("authReducer.js", () => {
  test("should return default state", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should authLogin", () => {
    const action = login({ uid: "demo" });
    const state = authReducer(initialState, action);

    expect(state).toEqual({ checking: false, uid: action.payload.uid });
  });

  test("should authStartRegister", () => {
    const action = register({ uid: "demo_2" });
    const state = authReducer(initialState, action);

    expect(state).toEqual({ checking: false, uid: action.payload.uid });
  });

  test("should authCheckingFinish", () => {
    const action = checkingFinish()
    const state = authReducer(initialState, action);

    expect(state).toEqual({ checking: false });
  });

  test("should authLogout", () => {
    const action = logout()
    const state = authReducer(initialState, action);

    expect(state).toEqual({ checking: false });
  });
});
