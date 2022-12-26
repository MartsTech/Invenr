import {api} from 'lib/api';
import {apiMethods, apiStatuses} from 'lib/api/api-constants';
import {calendarListLoaded} from './calendarList-state';
import type {CalendarListEntry} from './calendarList-types';

const calendarListApi = api.injectEndpoints({
  endpoints: builder => ({
    // ================= List =====================
    calendarList: builder.query<CalendarListEntry[], void>({
      query: () => ({
        url: '/calendarList',
        method: apiMethods.GET,
      }),
      async onQueryStarted(_arg, {queryFulfilled, dispatch}) {
        const result = await queryFulfilled;
        if (result.meta?.response?.status === apiStatuses.STATUS_200) {
          dispatch(calendarListLoaded(result.data));
        }
      },
      transformResponse: (response: {data: CalendarListEntry[]}) =>
        response.data,
      providesTags: ['CalendarListEntry'],
    }),
  }),
});

export const {useCalendarListQuery} = calendarListApi;

export default calendarListApi;
