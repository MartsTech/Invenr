import {calendar} from '@googleapis/calendar';
import {auth} from '@googleapis/oauth2';
import {getWeekDates} from 'common/week/getWeekDays';
import type {CalendarEvent} from 'features/events/events-types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from 'next-auth/react';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    calendarIds?: string;
    currentDate?: string;
    view?: string;
  };
}

type Data =
  | {
      data: CalendarEvent[];
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

  const now = new Date(req.query.currentDate || Date.now());

  let timeMin = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
  ).toISOString();

  let timeMax = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
  ).toISOString();

  if (req.query.view === 'Week') {
    const weekDays = getWeekDates(timeMin);
    timeMin = weekDays.first;
    timeMax = weekDays.last;
  }

  const calendarIds = req.query?.calendarIds?.split(',') || ['primary'];

  const list = await Promise.all(
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

  const events = list.flatMap(x =>
    x.items.data.items?.map(y => ({
      ...y,
      calendarId: x.calendarId,
    })),
  );

  const data: CalendarEvent[] =
    events.map(item => ({
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
    })) || [];

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  res.status(200).json({data});
};

export default handler;
