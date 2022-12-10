import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
    refreshToken: string | undefined;
    accessToken: string | undefined;
    accessTokenExpires: number | undefined;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    refreshToken: string | undefined;
    accessToken: string | undefined;
    accessTokenExpires: number | undefined;
  }
}
