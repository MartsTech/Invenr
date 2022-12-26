import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {api} from 'lib/api';
import {authPersistedReducer} from 'modules/auth/auth-state';
import {calendarListPersistedReducer} from 'modules/calendarList/calendarList-state';
import {eventMiddleware} from 'modules/event/event-middleware';
import {eventPersistedReducer} from 'modules/event/event-state';
import {createLogger} from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    diff: true,
    collapsed: true,
  });

  middlewares.push(logger);
}

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authPersistedReducer,
  calendarList: calendarListPersistedReducer,
  event: eventPersistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, eventMiddleware, ...middlewares),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
