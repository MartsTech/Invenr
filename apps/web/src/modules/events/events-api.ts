import {api} from 'lib/api';
import {apiMethods} from 'lib/api/api-constants';
import type {CalendarEvent} from './events-types';

const eventsApi = api.injectEndpoints({
  endpoints: builder => ({
    // ================= List =====================
    events: builder.query<CalendarEvent[], {calendarIds?: string}>({
      query: ({calendarIds}) => ({
        url: '/api/events',
        method: apiMethods.GET,
        params: {
          calendarIds,
        },
      }),
      transformResponse: (response: {items: CalendarEvent[]}) => response.items,
    }),
  }),
});

export const {useLazyEventsQuery} = eventsApi;

export default eventsApi;
