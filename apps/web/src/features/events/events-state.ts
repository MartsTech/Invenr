import {createAction, createReducer} from '@reduxjs/toolkit';
import type {RequestState, RootState} from 'lib/store/store-types';
import {reqStateDefault} from 'lib/store/store-utils';
import moment from 'moment';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {CalendarEvent} from './events-types';
import {resolveScheduleConflicts} from './events-utils';

// =================== Types ======================
export interface EventsState {
  listState: RequestState<CalendarEvent[]>;
  backup: CalendarEvent[];
}

// ============== Initial state ===================
const initialState: EventsState = {
  listState: reqStateDefault(),
  backup: [],
};

// =================== Actions ====================
export const eventsListStateUpdated = createAction<EventsState['listState']>(
  'events/listStateUpdated',
);

export const eventsRescheduled = createAction<{date: string}>(
  'events/rescheduled',
);

export const eventsRestoreBackup = createAction('events/restoreBackup');

// ================= Reducers =====================
export const eventsReducer = createReducer(initialState, builder => {
  builder.addCase(eventsListStateUpdated, (state, action) => {
    state.listState = {
      ...state.listState,
      body: [
        ...(state.listState.body || []).filter(
          x => !action.payload.body?.find(y => x.id === y.id),
        ),
        ...(action.payload.body || []),
      ],
    };
  });
  builder.addCase(eventsRescheduled, (state, action) => {
    state.backup = [
      ...(state.listState.body?.filter(x =>
        moment(x.start.dateTime).isSame(action.payload.date, 'day'),
      ) || []),
    ];

    state.listState.body = [
      ...(state.listState.body || []).filter(
        x => !moment(x.start.dateTime).isSame(action.payload.date, 'day'),
      ),
    ];

    const events = resolveScheduleConflicts([...(state.backup || [])]);

    state.listState.body = [...(state.listState.body || []), ...events];
  });
  builder.addCase(eventsRestoreBackup, state => {
    if (state.backup.length === 0) {
      return;
    }

    state.listState.body = [
      ...(state.listState.body || []).filter(
        x =>
          !moment(x.start.dateTime).isSame(
            state.backup[0].start.dateTime,
            'day',
          ),
      ),
    ];

    state.listState.body = [...(state.listState.body || []), ...state.backup];

    state.backup = [];
  });
});

// ================= Persistors =====================
export const eventsPersistedReducer = persistReducer(
  {
    key: 'events',
    storage: storage,
    whitelist: [''],
  },
  eventsReducer,
);

// ================= Selectors ====================
export const eventsListStateSelector = (
  state: RootState,
): EventsState['listState'] => state.events.listState;

export const eventsHasBackupSelector = (state: RootState): boolean =>
  state.events.backup.length > 0;
