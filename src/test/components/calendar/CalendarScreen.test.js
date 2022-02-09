import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages-en";
import { uiOpenModal } from "../../../actions/ui";
import { eventSetActive } from "../../../actions/events";
import { act } from "@testing-library/react";

jest.mock("../../../actions/events", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: "uid",
  },
  calendar: {
    events: [],
    activeEvent: {},
  },
  ui: {
    modalOpen: false,
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("CalendarScreen.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show CalendarScreen", () => {
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });

  test("should call CalendarScreen interactions", () => {
    const calendar = wrapper.find("Calendar");
    const calendarMessages = calendar.prop("messages");

    expect(calendar.exists()).toBe(true);
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith(uiOpenModal());

    const event = {
      start: "",
    };
    calendar.prop("onSelectEvent")(event);
    expect(eventSetActive).toHaveBeenCalledWith(event);

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
