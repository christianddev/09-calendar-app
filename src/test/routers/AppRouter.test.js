import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { AppRouter } from "../../routers/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("AppRouter.js", () => {
  test("should show wait...", () => {
    const initState = {
      auth: {
        checking: true,
        uid: "uidXD",
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.find("h4").exists()).toBe(true);
  });

  test("should show public route", () => {
    const initState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("should show private route", () => {
    const initState = {
      ui: {
        modalOpen: false,
      },
      auth: {
        checking: false,
        uid: "uidXD",
        name: "nameXD",
      },
      calendar: {
        events: [],
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

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
