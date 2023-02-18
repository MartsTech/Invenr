import {EventTracker} from '@devexpress/dx-react-chart';
import {
  Chart,
  Legend,
  PieSeries,
  Title,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import {
  calendarCurrentDateChanged,
  calendarCurrentDateSelector,
} from 'features/calendar/calendar-state';
import {calendarListStateSelector} from 'features/calendarList/calendarList-state';
import {eventsListStateSelector} from 'features/events/events-state';
import {useStoreDispatch, useStoreSelector} from 'lib/store/store-hooks';
import moment from 'moment';
import {useMemo} from 'react';
import {Box} from 'ui';

const DashboardModule = () => {
  const dispatch = useStoreDispatch();

  const calendarList = useStoreSelector(calendarListStateSelector);
  const events = useStoreSelector(eventsListStateSelector);

  const currentDate = useStoreSelector(calendarCurrentDateSelector);

  const calendars = useMemo(() => {
    let data: {[key: string]: {count: number}} = {};

    events.body
      ?.filter(x => moment(x.start.dateTime).isSame(currentDate, 'day'))
      .forEach(event => {
        if (!data[event.calendarId]) {
          data[event.calendarId] = {
            count: 0,
          };
        }
        data[event.calendarId].count++;
      });

    return Object.entries(data).map(([name, {count}]) => ({
      name: calendarList.body?.find(calendar => calendar.id === name)?.summary,
      count,
    }));
  }, [events, calendarList, currentDate]);

  return (
    <Paper>
      <StyledWrapper>
        <StyledContainer>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={currentDate}
              onChange={value =>
                value && dispatch(calendarCurrentDateChanged(value))
              }
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </StyledContainer>
        <StyledContainer>
          <Chart data={calendars}>
            <Title text={'All Calendars'} />
            <PieSeries
              name="All Calendars"
              valueField="count"
              argumentField="name"
            />
            <Legend />
            <EventTracker />
            <Tooltip />
          </Chart>
        </StyledContainer>
      </StyledWrapper>
    </Paper>
  );
};

export default DashboardModule;

const StyledWrapper = styled(Paper)(({theme}) => ({
  display: 'flex',
  flex: 1,
  padding: '1rem',

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    padding: 0,
  },
}));

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 0.5,
  justifyContent: 'center',
});
