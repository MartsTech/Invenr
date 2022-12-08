import NextAuth, {NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: process.env.GOOGLE_SCOPE,
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({session, token}) {
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
