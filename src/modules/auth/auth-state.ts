import {createAction, createReducer} from '@reduxjs/toolkit';
import type {RootState} from 'lib/store/store-types';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {AuthSession} from './auth-types';

// =================== Types ======================
export interface AuthState {
  session: AuthSession | null;
}

// ============== Initial state ===================
const initialState: AuthState = {
  session: null,
};

// ================== Actions =====================
export const authLogin = createAction<{session: AuthSession}>('auth/login');

export const authLogout = createAction('auth/logout');

export const authSessionChanged = createAction<AuthSession>(
  'auth/sessionChanged',
);

// ================= Reducers =====================
export const authReducer = createReducer(initialState, builder => {
  builder.addCase(authLogin, (state, action) => {
    state.session = action.payload.session;
  });
  builder.addCase(authLogout, state => {
    state.session = null;
  });
  builder.addCase(authSessionChanged, (state, action) => {
    state.session = action.payload;
  });
});

// ================= Persistors =====================
export const authPersistedReducer = persistReducer(
  {
    key: 'auth',
    storage: storage,
    whitelist: ['session'],
  },
  authReducer,
);

// ================= Selectors =====================
export const authSignedSelector = (state: RootState): boolean =>
  state.auth.session !== null;

export const authSessionSelector = (state: RootState): AuthSession | null =>
  state.auth.session;
