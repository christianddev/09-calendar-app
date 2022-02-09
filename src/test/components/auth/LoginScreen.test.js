import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("LoginScreen.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show correctly", () => {
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("should login", () => {
    const email = "email@email.com";
    const password = "123123";
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: {
        name: "lEmail",
        value: email,
      },
    });
    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: {
        name: "lPassword",
        value: password,
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });
    expect(startLogin).toHaveBeenCalledWith(email, password);
  });

  test("should show check passwords", () => {
    const password = "123123";
    const password2 = "12312";
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: password,
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: password2,
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });
    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith("Error", "Check passwords", "error");
  });

  test("should register user", () => {
    const password = "123123";
    const password2 = "123123";
    const name = "userXD";
    const email = "email@email.com";

    wrapper.find('input[name="rName"]').simulate("change", {
      target: {
        name: "rName",
        value: name,
      },
    });
    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: {
        name: "rEmail",
        value: email,
      },
    });
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: password,
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: password2,
      },
    });

    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith(name, email, password);
  });
});
