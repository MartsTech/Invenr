import type {AnyAction} from '@reduxjs/toolkit';
import {calendarListStateUpdated} from 'features/calendarList/calendarList-state';
import type {StoreMiddleware} from 'lib/store/store-types';
import eventApi from './event-api';

export const eventsMiddleware: StoreMiddleware = store => {
  return next => {
    return (action: AnyAction) => {
      // ...Code before reducers and other middleware

      const result = next(action);

      // ...Code after reducers and other middleware

      if (calendarListStateUpdated.match(action) && action.payload.isSuccess) {
        store.dispatch(
          eventApi.endpoints.events.initiate({
            calendarIds: action.payload.body?.map(
              (calendar: {id: string}) => calendar.id,
            ),
          }),
        );
      }

      return result;
    };
  };
};
