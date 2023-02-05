import {calendar} from '@googleapis/calendar';
import {auth} from '@googleapis/oauth2';
import type {CalendarListEntry} from 'features/calendarList/calendarList-types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from 'next-auth/react';

type Data =
  | {
      data: CalendarListEntry[];
    }
  | {
      error: string;
    };

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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

  const calendarList = await calendar({
    version: 'v3',
    auth: process.env.GOOGLE_CALENDAR_API_KEY,
  }).calendarList.list({
    auth: authClient,
  });

  const data: CalendarListEntry[] =
    calendarList.data.items?.map(item => ({
      id: item.id || '',
      summary: item.summary || '',
      colorId: item.colorId || '',
      backgroundColor: item.backgroundColor || '',
      foregroundColor: item.foregroundColor || '',
      selected: item.selected || false,
      primary: item.primary || false,
    })) ?? [];

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  res.status(200).json({data});
};

export default handler;
