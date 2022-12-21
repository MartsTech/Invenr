import memoize from 'lodash.memoize';
import type {Session} from 'next-auth';
import type {AuthSession} from './auth-types';

export const authSessionTransformer = memoize(
  (session: Session): AuthSession => ({
    user: session.user,
    expires: session.expires,
  }),
);
