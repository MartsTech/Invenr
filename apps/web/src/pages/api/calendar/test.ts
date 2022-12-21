import {calendar} from '@googleapis/calendar';
import {auth} from '@googleapis/oauth2';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});

  if (!session) {
    return res.status(401).json({error: 'Not authenticated'});
  }

  const authClient = new auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXTAUTH_URL,
  );

  authClient.setCredentials({
    access_token: session.accessToken,
    refresh_token: session.refreshToken,
  });

  const list = await calendar({
    version: 'v3',
    auth: process.env.GOOGLE_CALENDAR_API_KEY,
  }).calendarList.list({
    auth: authClient,
  });

  res.status(200).json(list);
};

export default handler;
