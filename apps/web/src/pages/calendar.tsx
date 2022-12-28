import CalendarModule from 'modules/calendar/CalendarModule';
import {useCalendarListQuery} from 'modules/calendarList/calendarList-api';
import type {GetStaticProps, NextPage} from 'next';

const CalendarPage: NextPage = () => {
  useCalendarListQuery();

  return <CalendarModule />;
};
export default CalendarPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Calendar',
    },
  };
};
