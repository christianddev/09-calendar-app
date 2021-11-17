import React, { useState } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-en';
import { CalendarEvent } from './CalendarEvent';

import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarModal } from './CalendarModal';
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') ?? 'month')

  const onDoubleClick = (e) => {
    console.log('onDoubleClick', e)
  }
  const onSelect = (e) => {
    console.log('onSelect', e)
  }
  const onView = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = (event, start, end, isSelected ) => {
    const style ={
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: '0.8',
      display: 'block',
      color: 'white'
    }
    return {
      style
    };
  };

  const events = [{
    title: 'Event 1',
    start: moment().toDate(),
    end: moment().add(2,'hours').toDate(),
    bgcolor: '#fafafa',
    user: {
      _id: '123',
      name: 'Lola'
    }
  }]


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
          event: CalendarEvent
        }}
      />
      <CalendarModal />
    </div>
  )
}
