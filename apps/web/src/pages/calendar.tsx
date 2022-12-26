import {useStoreSelector} from 'lib/store/store-hooks';
import {useCalendarListQuery} from 'modules/calendarList/calendarList-api';
import {calendarListSelector} from 'modules/calendarList/calendarList-state';
import {eventListSelector} from 'modules/event/event-state';
import PageProvider from 'modules/page/PageProvider';
import type {NextPage} from 'next';
import {useMemo} from 'react';
import {Calendar, CalendarAppointment, CalendarResource} from 'ui';

const CalendarPage: NextPage = () => {
  useCalendarListQuery();

  const calendarList = useStoreSelector(calendarListSelector);
  const events = useStoreSelector(eventListSelector);

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
