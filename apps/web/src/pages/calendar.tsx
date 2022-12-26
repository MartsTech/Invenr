import {useCalendarListQuery} from 'modules/calendarList/calendarList-api';
import {useLazyEventsQuery} from 'modules/events/events-api';
import type {CalendarEvent} from 'modules/events/events-types';
import PageProvider from 'modules/page/PageProvider';
import type {NextPage} from 'next';
import {useEffect, useMemo, useState} from 'react';
import {Calendar, CalendarAppointment, CalendarResource} from 'ui';

const CalendarPage: NextPage = () => {
  const {data: calendarList} = useCalendarListQuery();
  const [eventsQuery] = useLazyEventsQuery();

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (calendarList?.length) {
      eventsQuery({calendarIds: calendarList.map(item => item.id).join(',')})
        .unwrap()
        .then(setEvents);
    }
  }, [calendarList, eventsQuery]);

  const currentDate: string = useMemo(() => new Date().toISOString(), []);

  const appointments: CalendarAppointment[] = useMemo(
    () =>
      events?.map(item => ({
        id: item.id,
        startDate: item.start.dateTime,
        endDate: item.end.dateTime,
        title: item.summary,
        allDay: item.allDay,
        calendarId: item.calendarId,
      })) || [],
    [events],
  );

  const resources: CalendarResource[] = useMemo(
    () => [
      {
        fieldName: 'calendarId',
        title: 'Calendar Id',
        instances:
          calendarList?.map(item => ({
            id: item.id,
            text: item.summary,
            color: item.backgroundColor,
          })) || [],
      } as CalendarResource,
    ],
    [calendarList],
  );

  return (
    <PageProvider>
      <Calendar
        currentDate={currentDate}
        appointments={appointments}
        resources={resources}
      />
      <div>
        {calendarList?.map(item => (
          <p key={item.id}>{item.summary}</p>
        ))}
      </div>
    </PageProvider>
  );
};
export default CalendarPage;
