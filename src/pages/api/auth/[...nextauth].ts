import {PrismaAdapter} from '@next-auth/prisma-adapter';
import dbClient from 'lib/db';
import type {NextApiHandler} from 'next';
import NextAuth, {NextAuthOptions} from 'next-auth';
import type {JWT} from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

const AuthHandler: NextApiHandler = (req, res) => {
  const options: NextAuthOptions = {
    adapter: PrismaAdapter(dbClient),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          url: 'https://accounts.google.com/o/oauth2/v2/auth',
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope: process.env.GOOGLE_SCOPE,
          },
        },
      }),
    ],
    secret: process.env.NEXTAUTH_JWT_SECRET,
    callbacks: {
      jwt: async ({token, account, user}) => {
        if (account && user) {
          token.refreshToken = account.refresh_token;
          token.accessToken = account.access_token;
          token.accessTokenExpires =
            Date.now() + (account.expires_at ?? 0) * 1000;
        }

        if (
          typeof token.accessTokenExpires !== 'undefined' &&
          Date.now() < token.accessTokenExpires
        ) {
          return token;
        }

        return refreshAccessToken(token);
      },
      session: async ({session, token}) => {
        session.refreshToken = token.refreshToken;
        session.accessToken = token.accessToken;
        session.accessTokenExpires = token.accessTokenExpires;

        return session;
      },
    },
  };

  return NextAuth(req, res, options);
};

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const url = new URL('https://oauth2.googleapis.com/token');

    url.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID);
    url.searchParams.set('client_secret', process.env.GOOGLE_CLIENT_SECRET);
    url.searchParams.set('grant_type', 'refresh_token');
    url.searchParams.set('refresh_token', token.refreshToken ?? '');

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshToken = await response.json();

    if (!response.ok) {
      throw refreshToken;
    }

    return {
      ...token,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_at * 1000,
    };
  } catch (error) {
    console.error(`auth/refreshAccessTokenError - ${error}`);
    return token;
  }
};

export default AuthHandler;
