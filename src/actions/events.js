import Swal from "sweetalert2";
import { customFetchToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { processErrorMessage } from "../helpers/processErrorMessage";
import { types } from "../types/types";

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    try {
      const {
        auth: { uid: _id, name },
      } = getState();
      const response = await customFetchToken("events", event, "POST");
      const body = await response.json();
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
      console.error("eventStartAddNew", error);
      Swal.fire("Error", JSON.stringify(error), "error");
    }
  };
};

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventStartUpdated = (event) => {
  return async (dispatch) => {
    try {
      const response = await customFetchToken(
        `events/${event.id}`,
        event,
        "PUT"
      );
      const body = await response.json();
      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", processErrorMessage(body?.errors), "error");
      }
    } catch (error) {
      console.error("eventStartUpdated", error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    try {
      const { id } = getState()?.calendar?.activeEvent;
      const response = await customFetchToken(`events/${id}`, {}, "DELETE");
      const body = await response.json();
      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", processErrorMessage(body?.errors), "error");
      }
    } catch (error) {
      console.error("eventStartUpdated", error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const response = await customFetchToken("events");
      const body = await response.json();
      const events = prepareEvents(body?.msg?.events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.error("eventStartLoading", error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({ type: types.eventLogout });
