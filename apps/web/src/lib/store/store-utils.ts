import {miniSerializeError} from '@reduxjs/toolkit';
import type {RequestState} from './store-types';

export const reqStateDefault = <T>(): RequestState<T> => ({
  isLoading: false,
  isSuccess: false,
  isDefault: true,
  isFailure: false,
});

export const reqStateLoading = <T>(): RequestState<T> => ({
  isLoading: true,
  isSuccess: false,
  isDefault: false,
  isFailure: false,
});

export const reqStateSuccess = <T>(body?: T): RequestState<T> => ({
  isLoading: false,
  isSuccess: true,
  isDefault: false,
  isFailure: false,
  body,
});

export const reqStateFailure = <T>(error: Error): RequestState<T> => ({
  isLoading: false,
  isSuccess: false,
  isDefault: false,
  isFailure: true,
  error: miniSerializeError(error),
});
