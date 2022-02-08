import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initialState = {
  modalOpen: false,
};

describe("uiReducer.js", () => {
  test("should return default state", () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should open & close modal", () => {
    const openModal = uiOpenModal();
    const closeModal = uiCloseModal();
    const stateOpen = uiReducer(initialState, openModal);

    expect(stateOpen).toEqual({ modalOpen: true });
    const stateClose = uiReducer(initialState, closeModal);
    expect(stateClose).toEqual({ modalOpen: false });
  });
});
