import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import moment from "moment";
import { act } from "@testing-library/react";

import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdated,
} from "../../../actions/events";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, "hours");
const initState = {
  auth: {
    uid: "uid",
  },
  calendar: {
    events: [],
    activeEvent: {
      title: "title",
      notes: "notes",
      start: now.toDate(),
      end: now.add(1, "hours").toDate(),
    },
  },
  ui: {
    modalOpen: true,
  },
};

const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => ({
  eventStartUpdated: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("CalendarModal.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should show modal", () => {
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("should call update action and close modal", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(eventStartUpdated).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    expect(eventClearActiveEvent).toHaveBeenCalledTimes(1);
  });
  test("should show error", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
      true
    );
  });
  test("should create new event", () => {
    const initState = {
      auth: {
        uid: "uid",
      },
      calendar: {
        events: [],
      },
      ui: {
        modalOpen: true,
      },
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "valueXD",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: "valueXD",
      notes: "",
    });
  });
  test("should validate dates", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "valueXD_2",
      },
    });

    const now = new Date();

    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(now);
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "End date must be higher",
      "error"
    );
  });
});
