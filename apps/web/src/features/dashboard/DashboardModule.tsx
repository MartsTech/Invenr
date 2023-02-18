import {EventTracker, ValueScale} from '@devexpress/dx-react-chart';
import {
  BarSeries,
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
import {CalendarEvent} from 'features/events/events-types';
import {eventsFindTimeSlots} from 'features/events/events-utils';
import {useStoreDispatch, useStoreSelector} from 'lib/store/store-hooks';
import moment from 'moment';
import {useEffect, useMemo, useState} from 'react';
import {Box} from 'ui';

const DashboardModule = () => {
  const dispatch = useStoreDispatch();

  const calendarList = useStoreSelector(calendarListStateSelector);
  const events = useStoreSelector(eventsListStateSelector);

  const currentDate = useStoreSelector(calendarCurrentDateSelector);

  const [prevData, setPrevData] = useState<CalendarEvent[]>([]);

  const currentData = useMemo(() => {
    const data = events.body?.filter(x =>
      moment(x.start.dateTime).isSame(currentDate, 'day'),
    );

    if (typeof data !== 'undefined' && data?.length > 0) {
      return data;
    }

    return prevData;
  }, [events, currentDate]);

  useEffect(() => {
    if (typeof currentData !== 'undefined' && currentData?.length > 0) {
      setPrevData(currentData);
    }
  }, [currentData]);

  const calendarsData = useMemo(() => {
    let data: {[key: string]: {count: number}} = {};

    currentData?.forEach(event => {
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
  }, [calendarList, currentData]);

  const currentEvents = useMemo(() => {
    const result: {[name: string]: number} = {};

    if (!currentData || currentData.length === 0) {
      return [];
    }

    const timeSlots = eventsFindTimeSlots(currentData);

    timeSlots.forEach(slot => {
      if (!result[slot.type]) {
        result[slot.type] = 0;
      }
      result[slot.type]++;
    });

    return Object.entries(result).map(([name, count]) => ({
      name: name.slice(0, 1).toUpperCase() + name.slice(1),
      count,
    }));
  }, [currentData]);

  const bars = useMemo(() => {
    const bars = currentData?.map(event => {
      const duration = moment(event.end.dateTime).diff(event.start.dateTime);

      return {
        name: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime,
        duration: moment.duration(duration).asHours(),
      };
    });

    return bars;
  }, [currentData]);

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
          <Chart data={bars}>
            <ValueScale name="name" />
            <ValueScale name="duration" />
            <BarSeries
              name="Events Duration"
              valueField="duration"
              argumentField="name"
              scaleName="duration"
            />
            <Legend />
            <EventTracker />
            <Tooltip />
          </Chart>
        </StyledContainer>
      </StyledWrapper>
      <StyledWrapper>
        <StyledContainer>
          <Chart data={calendarsData}>
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
        <StyledContainer>
          <Chart data={currentEvents}>
            <Title text={'Events Availability'} />
            <PieSeries
              name="Events Availability"
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
