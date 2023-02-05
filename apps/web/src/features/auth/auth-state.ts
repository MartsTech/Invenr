import {createAction, createReducer} from '@reduxjs/toolkit';
import type {RequestState, RootState} from 'lib/store/store-types';
import {reqStateDefault} from 'lib/store/store-utils';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {AuthSession} from './auth-types';

// =================== Types ======================
export interface AuthState {
  sessionState: RequestState<AuthSession>;
}

// ============== Initial state ===================
const initialState: AuthState = {
  sessionState: reqStateDefault(),
};

// ================== Actions =====================
export const authSessionStateUpdated = createAction<AuthState['sessionState']>(
  'auth/sessionStateUpdated',
);

// ================= Reducers =====================
export const authReducer = createReducer(initialState, builder => {
  builder.addCase(authSessionStateUpdated, (state, action) => {
    state.sessionState = action.payload;
  });
});

// ================= Persistors =====================
export const authPersistedReducer = persistReducer(
  {
    key: 'auth',
    storage: storage,
    whitelist: ['sessionState'],
  },
  authReducer,
);

// ================= Selectors =====================
export const authSessionStateSelector = (
  state: RootState,
): AuthState['sessionState'] => state.auth.sessionState;
