import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import {useStoreSelector} from 'lib/store/store-hooks';
import {calendarListSelector} from 'modules/calendarList/calendarList-state';
import {eventListSelector} from 'modules/event/event-state';
import {FC, useMemo} from 'react';
import {Calendar, CalendarAppointment, CalendarResource} from 'ui';

const CalendarModule: FC = () => {
  const calendarList = useStoreSelector(calendarListSelector);
  const events = useStoreSelector(eventListSelector);

  const currentDate: string = useMemo(() => new Date().toISOString(), []);

  const appointments: CalendarAppointment[] = useMemo(
    () =>
      events?.map(
        item =>
          ({
            id: item.id,
            startDate: item.start.dateTime,
            endDate: item.end.dateTime,
            title: item.summary,
            allDay: item.allDay,
            calendarId: item.calendarId,
          } as CalendarAppointment),
      ) || [],
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
    <StyledContainer>
      <Calendar
        currentDate={currentDate}
        appointments={appointments}
        resources={resources}
      />
    </StyledContainer>
  );
};

export default CalendarModule;

const StyledList = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledContainer = styled(Box)({
  display: 'flex',
  height: '100%',
});
