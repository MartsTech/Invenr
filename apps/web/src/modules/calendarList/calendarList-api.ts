import {api} from 'lib/api';
import {apiMethods} from 'lib/api/api-constants';
import type {CalendarListEntry} from './calendarList-types';

const calendarListApi = api.injectEndpoints({
  endpoints: builder => ({
    // ================= List =====================
    calendarList: builder.query<CalendarListEntry[], void>({
      query: () => ({
        url: '/api/calendarList',
        method: apiMethods.GET,
      }),
      transformResponse: (response: {items: CalendarListEntry[]}) =>
        response.items,
    }),
  }),
});

export const {useCalendarListQuery} = calendarListApi;

export default calendarListApi;
