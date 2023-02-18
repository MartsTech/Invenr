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
  available: 'busy' | 'free';
}

export interface EventTimeSlot {
  start: string;
  end: string;
  type: 'busy' | 'free' | 'unknown';
  claimed: boolean;
}
