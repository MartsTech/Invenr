import {calendar} from '@googleapis/calendar';
import {auth} from '@googleapis/oauth2';
import type {CalendarListEntry} from 'modules/calendarList/calendarList-types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from 'next-auth/react';

type Data =
  | {
      items: CalendarListEntry[];
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

  const list = await calendar({
    version: 'v3',
    auth: process.env.GOOGLE_CALENDAR_API_KEY,
  }).calendarList.list({
    auth: authClient,
  });

  res.status(200).json({
    items:
      list.data.items?.map(item => ({
        id: item.id || '',
        summary: item.summary || '',
        colorId: item.colorId || '',
        backgroundColor: item.backgroundColor || '',
        foregroundColor: item.foregroundColor || '',
        selected: item.selected || false,
        primary: item.primary || false,
      })) ?? [],
  });
};

export default handler;
