import {api} from 'lib/api';
import type {LoginProviders} from 'modules/login/login-types';
import {signIn, signOut} from 'next-auth/react';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    // ================= Sign In =====================
    authSignIn: builder.mutation<void, {providerId: keyof LoginProviders}>({
      queryFn: async ({providerId}) => {
        try {
          await signIn(providerId);
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: 'Internal Server Error',
              data: "Couldn't sign in",
            },
          };
        }
        return {
          data: undefined,
        };
      },
    }),
    // ================= Sign Out =====================
    authSignOut: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await signOut();
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: 'Internal Server Error',
              data: "Couldn't sign out",
            },
          };
        }
        return {
          data: undefined,
        };
      },
    }),
  }),
});

export const {useAuthSignInMutation, useAuthSignOutMutation} = authApi;

export default authApi;
