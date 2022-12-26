import type {AnyAction} from '@reduxjs/toolkit';
import type {StoreMiddleware} from 'lib/store/store-types';
import {calendarListLoaded} from 'modules/calendarList/calendarList-state';
import eventApi from './event-api';

export const eventMiddleware: StoreMiddleware = store => {
  return next => {
    return (action: AnyAction) => {
      // ...Code before reducers and other middleware

      const result = next(action);

      // ...Code after reducers and other middleware

      if (action.type === calendarListLoaded.type) {
        store.dispatch(
          eventApi.endpoints.events.initiate({
            calendarIds: action.payload.map(
              (calendar: {id: string}) => calendar.id,
            ),
          }),
        );
      }

      return result;
    };
  };
};
