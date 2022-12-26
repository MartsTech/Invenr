import {calendar} from '@googleapis/calendar';
import {auth} from '@googleapis/oauth2';
import type {CalendarEvent} from 'modules/events/events-types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from 'next-auth/react';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    calendarIds?: string;
  };
}

type Data =
  | {
      items: CalendarEvent[];
    }
  | {
      error: string;
    };

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>,
) => {
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

  const now = new Date();

  const timeMin = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
  ).toISOString();

  const timeMax = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
  ).toISOString();

  const calendarIds = req.query?.calendarIds?.split(',') || ['primary'];

  const events = await Promise.all(
    calendarIds.map(async calendarId => {
      const items = await calendar({
        version: 'v3',
        auth: process.env.GOOGLE_CALENDAR_API_KEY,
      }).events.list({
        calendarId,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime',
        auth: authClient,
      });

      return {items, calendarId};
    }),
  );

  const list = events.flatMap(calendarEvents =>
    calendarEvents.items.data.items?.map(item => ({
      ...item,
      calendarId: calendarEvents.calendarId,
    })),
  );

  res.status(200).json({
    items:
      list.map(item => ({
        id: item?.id || '',
        htmlLink: item?.htmlLink || '',
        summary: item?.summary || '',
        start: {
          dateTime: item?.start?.dateTime || timeMin,
        },
        end: {
          dateTime: item?.end?.dateTime || timeMax,
        },
        allDay:
          typeof item?.start?.dateTime !== 'string' &&
          typeof item?.end?.dateTime !== 'string',
        calendarId: item?.calendarId || '',
      })) || [],
  });
};

export default handler;
