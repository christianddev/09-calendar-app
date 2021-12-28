import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { messages } from "../../helpers/calendar-messages-en";
import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") ?? "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };
  const onView = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: "0.8",
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  const selectSlot = () => dispatch(eventClearActiveEvent());

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onView={onView}
        onSelectEvent={onSelect}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
        selectable={true}
        onSelectSlot={selectSlot}
      />
      <DeleteEventFab />
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
