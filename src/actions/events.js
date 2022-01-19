import Swal from "sweetalert2";
import { customFetchToken } from "../helpers/fetch";
import { processErrorMessage } from "../helpers/processErrorMessage";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    try {
      const {
        auth: { uid: _id, name },
      } = getState();
      const response = await customFetchToken("events", event, "POST");
      const body = await response.json();
      console.log('body.event', body.event)
      if (body.ok) {
        event.id = body.msg.event.id;
        event.user = {
          _id,
          name,
        };
        dispatch(eventAddNew(event));
      } else {
        Swal.fire("Error", processErrorMessage(body?.errors), "error");
      }
    } catch (error) {
      console.log('error', error)
      Swal.fire("Error", JSON.stringify(error), "error");
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});
