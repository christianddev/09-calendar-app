import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from "../../../actions/events";

jest.mock("../../../actions/events", () => ({
  eventStartDelete: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  calendar: {
    activeEvent: {
      title: "",
      notes: "",
      start: "",
      end: "",
      user: {
        _id: "",
        name: "",
      },
      id: "",
    },
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <DeleteEventFab />
    </MemoryRouter>
  </Provider>
);

describe("deleteEventFab.js", () => {
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call eventStartDelete", () => {
    wrapper.find(".btn-danger").prop("onClick")();
    expect(eventStartDelete).toHaveBeenCalledTimes(1);
  });
});
