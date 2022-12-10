import isEqual from 'lodash.isequal';
import memoize from 'lodash.memoize';
import type {AuthSession} from './auth-types';

export const authSessionDifference = memoize(
  (a: AuthSession, b: AuthSession) => {
    a = {...a, expires: ''};
    b = {...b, expires: ''};
    return !isEqual(a, b);
  },
);
