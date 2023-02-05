import type {DefaultSession} from 'next-auth';

export interface AuthSession extends DefaultSession {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}
