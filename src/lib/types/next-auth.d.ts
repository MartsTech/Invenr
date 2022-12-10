import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    refreshToken: string | undefined;
    accessToken: string | undefined;
    accessTokenExpires: number | undefined;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    refreshToken: string | undefined;
    accessToken: string | undefined;
    accessTokenExpires: number | undefined;
  }
}
