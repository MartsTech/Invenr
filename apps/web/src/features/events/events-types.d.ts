export interface CalendarEvent {
  id: string;
  htmlLink: string;
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  allDay: boolean;
  calendarId: string;
}