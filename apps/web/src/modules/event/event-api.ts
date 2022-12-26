import {api} from 'lib/api';
import {apiMethods, apiStatuses} from 'lib/api/api-constants';
import {eventListLoaded} from './event-state';
import type {CalendarEvent} from './event-types';

const eventApi = api.injectEndpoints({
  endpoints: builder => ({
    // ================= List =====================
    events: builder.query<CalendarEvent[], {calendarIds?: string[]}>({
      query: ({calendarIds}) => ({
        url: '/event',
        method: apiMethods.GET,
        params: {
          calendarIds: calendarIds?.join(','),
        },
      }),
      async onQueryStarted(_arg, {queryFulfilled, dispatch}) {
        const result = await queryFulfilled;
        if (result.meta?.response?.status === apiStatuses.STATUS_200) {
          dispatch(eventListLoaded(result.data));
        }
      },
      transformResponse: (response: {data: CalendarEvent[]}) => response.data,
      providesTags: ['CalendarEvent'],
    }),
  }),
});

export default eventApi;
