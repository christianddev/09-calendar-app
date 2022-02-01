import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { messages } from "../../helpers/calendar-messages-en";
import { uiOpenModal } from "../../actions/ui";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();

  const {
    calendar: { events },
    auth: { uid },
  } = useSelector((state) => state);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") ?? "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

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
    const isHis = event?.user?._id === uid;
    const style = {
      backgroundColor: isHis ? "#367CF7" : "#465660",
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
