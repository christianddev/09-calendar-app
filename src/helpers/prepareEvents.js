import moment from "moment";

export const prepareEvents = (events = []) =>
  events.map((event) => ({
    ...event,
    end: moment(event.end).toDate(),
    start: moment(event.start).toDate(),
  }));
