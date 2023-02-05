import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {authPersistedReducer} from 'features/auth/auth-state';
import {calendarListPersistedReducer} from 'features/calendarList/calendarList-state';
import {eventsMiddleware} from 'features/events/events-middleware';
import {eventsPersistedReducer} from 'features/events/events-state';
import {api} from 'lib/api';
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
  events: eventsPersistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, eventsMiddleware, ...middlewares),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
