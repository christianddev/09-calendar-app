import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import "@testing-library/jest-dom";
import { startChecking, startLogin, startLogout, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import { processErrorMessage } from "../../helpers/processErrorMessage";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);
Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

describe("auth.js", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin ok", async () => {
    await store.dispatch(startLogin("1@email.com", "123123"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: expect.any(String), name: expect.any(String) },
    });
    expect(localStorage.setItem).toBeCalledWith("token", expect.any(String));
    expect(localStorage.setItem).toBeCalledWith(
      "token-init-date",
      expect.any(Number)
    );
    // const token = localStorage.setItem.mock.calls[0][1]
  });

  test("startLogin ko", async () => {
    await store.dispatch(startLogin("1@email.com", "123124"));
    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      processErrorMessage({ email: { msg: "verify email and password" } }),
      "error"
    );
  });

  test("startRegister ok", async () => {
    fetchModule.customFetch = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 123,
          name: "name",
          token: "tokenXD",
        };
      },
    }));
    await store.dispatch(startRegister("1@email.com", "123124", "test"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authStartRegister,
      payload: { uid: 123, name: "name" },
    });
    expect(localStorage.setItem).toBeCalledWith("token", "tokenXD");
    expect(localStorage.setItem).toBeCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking ok", async () => {
    fetchModule.customFetchToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 123,
          name: "name",
          token: "tokenXD_2",
        };
      },
    }));
    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: 123, name: "name" },
    });
    expect(localStorage.setItem).toBeCalledWith("token", "tokenXD_2");
    expect(localStorage.setItem).toBeCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test('startLogout ok', async() => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(localStorage.clear).toBeCalledTimes(1);
    expect(actions[0]).toEqual({ type: types.eventLogout }, { type: types.authLogout } )
  });

});
