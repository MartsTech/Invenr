declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_JWT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_SCOPE: string;
      GOOGLE_CALENDAR_API_KEY: string;
      DATABASE_URL: string;
      SHADOW_DATABASE_URL: string;
    }
  }
}

export {};
