import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdated,
} from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

const now = moment().minutes(0).seconds(0).add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: now.add(1, "hours").toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();

  const {
    ui: { modalOpen },
    calendar: { activeEvent },
  } = useSelector((state) => state);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (!!activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target?.name]: target?.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire("Error", "End date must be higher", "error");
    }

    if (activeEvent) {
      dispatch(eventStartUpdated(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    closeModal();
  };
  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        ariaHideApp={!process.env.NODE_ENV === "test"}
      >
        <h1>{activeEvent ? "Edit Event" : "New Event"}</h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group">
            <label>Start Date & Hour</label>
            <DateTimePicker
              onChange={(e) =>
                handleInputChange({ target: { name: "start", value: e } })
              }
              value={start}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Start Date & Hour</label>
            <DateTimePicker
              onChange={(e) =>
                handleInputChange({ target: { name: "end", value: e } })
              }
              value={end}
              minDate={start}
              className="form-control"
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className={`form-control ${!title && "is-invalid"}`}
              placeholder="Event title"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Short description
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notes"
              rows="5"
              name="notes"
              value={notes}
              onChange={handleInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Additional info
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Save</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
