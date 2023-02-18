import {calendar} from '@googleapis/calendar';
import {auth} from '@googleapis/oauth2';
import type {CalendarEvent} from 'features/events/events-types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from 'next-auth/react';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    events: CalendarEvent[];
  };
}

type Data =
  | CalendarEvent[]
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

  const {events} = req.body;

  if (!events || !events.length) {
    return res.status(400).json({error: 'No events provided'});
  }

  const newEvents: CalendarEvent[] = await Promise.all(
    events.map(async item => {
      if (item.id.endsWith('split')) {
        const response = await calendar({
          version: 'v3',
          auth: process.env.GOOGLE_CALENDAR_API_KEY,
        }).events.insert({
          calendarId: item.calendarId,
          requestBody: {
            start: {
              dateTime: item.start.dateTime,
            },
            end: {
              dateTime: item.end.dateTime,
            },
            summary: item.summary,
            transparency: item.available === 'free' ? 'transparent' : 'opaque',
          },
          auth: authClient,
        });

        return {
          ...item,
          id: response.data.id,
        } as CalendarEvent;
      }

      await calendar({
        version: 'v3',
        auth: process.env.GOOGLE_CALENDAR_API_KEY,
      }).events.update({
        calendarId: item.calendarId,
        eventId: item.id,
        requestBody: {
          start: {
            dateTime: item.start.dateTime,
          },
          end: {
            dateTime: item.end.dateTime,
          },
          summary: item.summary,
          transparency: item.available === 'free' ? 'transparent' : 'opaque',
        },
        auth: authClient,
      });

      return item;
    }),
  );

  res.status(200).json(newEvents);
};

export default handler;
