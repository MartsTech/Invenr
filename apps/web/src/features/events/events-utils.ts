import moment from 'moment';
import {CalendarEvent, EventTimeSlot} from './events-types';

export const resolveScheduleConflicts = (
  events: CalendarEvent[],
): CalendarEvent[] => {
  events.sort((a, b) =>
    moment(a.start.dateTime).diff(moment(b.start.dateTime)),
  );

  const timeSlots = eventsFindTimeSlots(events);

  for (let i = 0; i < events.length; i++) {
    let curr = events[i];

    if (curr.available === 'busy') {
      continue;
    }

    const index = eventsFindClosestTimeSlotIndex(timeSlots, curr);

    if (index !== -1) {
      eventsTakeTimeSlot(events, timeSlots, i, index);
    }
  }

  events.sort((a, b) =>
    moment(a.start.dateTime).diff(moment(b.start.dateTime)),
  );

  eventsMerge(events);

  return events;
};

export const eventsMerge = (events: CalendarEvent[]) => {
  for (let i = 1; i < events.length; i++) {
    const curr = events[i];
    const prev = events[i - 1];

    if (curr.id === prev.id) {
      prev.end.dateTime = curr.end.dateTime;
      events.splice(i, 1);
      i--;
    }
  }
};

export const eventsTakeTimeSlot = (
  events: CalendarEvent[],
  timeSlots: EventTimeSlot[],
  eventIndex: number,
  timeSlotIndex: number,
) => {
  let timeSlot = timeSlots[timeSlotIndex];

  let event = events[eventIndex];

  const timeSlotDuration = moment(timeSlot.end).diff(timeSlot.start);

  const eventDuration = moment(event.end.dateTime).diff(event.start.dateTime);

  if (timeSlotDuration === eventDuration) {
    timeSlot = {
      ...timeSlot,
      type: 'free',
      claimed: true,
    };

    event = {
      ...event,
      start: {
        dateTime: moment(timeSlot.start).format(),
      },
      end: {
        dateTime: moment(timeSlot.end).format(),
      },
    };

    events[eventIndex] = event;
    timeSlots[timeSlotIndex] = timeSlot;
  } else if (timeSlotDuration > eventDuration) {
    event = {
      ...event,
      start: {
        dateTime: moment(timeSlot.start).format(),
      },
      end: {
        dateTime: moment(timeSlot.start).add(eventDuration).format(),
      },
    };

    const firstTimeSlot: EventTimeSlot = {
      ...timeSlot,
      start: moment(event.start.dateTime).format(),
      end: moment(event.end.dateTime).format(),
      claimed: true,
      type: 'free',
    };

    const secondTimeSlot: EventTimeSlot = {
      ...timeSlot,
      start: moment(event.end.dateTime).format(),
      end: moment(timeSlot.end).format(),
    };

    events[eventIndex] = event;
    timeSlots[timeSlotIndex] = firstTimeSlot;
    timeSlots.splice(timeSlotIndex + 1, 0, secondTimeSlot);
  } else {
    timeSlot = {
      ...timeSlot,
      type: 'free',
      claimed: true,
    };

    event = {
      ...event,
      start: {
        dateTime: moment(timeSlot.start).format(),
      },
      end: {
        dateTime: moment(timeSlot.end).format(),
      },
    };

    const splitEvent: CalendarEvent = {
      ...event,
      start: {
        dateTime: moment(timeSlot.end).format(),
      },
      end: {
        dateTime: moment(timeSlot.end)
          .add(eventDuration - timeSlotDuration)
          .format(),
      },
    };

    timeSlots[timeSlotIndex] = timeSlot;
    events[eventIndex] = event;
    events.splice(eventIndex + 1, 0, splitEvent);
  }
};

export const eventsFindClosestTimeSlotIndex = (
  timeSlots: Array<EventTimeSlot>,
  event: CalendarEvent,
): number => {
  for (let i = 0; i < timeSlots.length; i++) {
    const timeSlot = timeSlots[i];

    if (timeSlot.type === 'busy' || timeSlot.claimed) {
      continue;
    }

    if (moment(timeSlot.start).isSameOrAfter(event.start.dateTime)) {
      return i;
    }
  }

  return -1;
};

export const eventsFindTimeSlots = (
  events: CalendarEvent[],
): EventTimeSlot[] => {
  const timeSlots: Array<EventTimeSlot> = [];

  const date = moment(events[0].start.dateTime);

  // Get 00:00:00 of the current date
  const startTime = moment(
    new Date(date.year(), date.month(), date.date(), 0, 0, 0),
  );

  // Get 23:59:59 of the current date
  const endTime = moment(
    new Date(date.year(), date.month(), date.date(), 23, 59, 59),
  );

  let prevStartTime = startTime;
  let prevEndTime = startTime;
  let prevEventType: 'free' | 'busy' = 'busy';

  // Get all the time slots between the start and end time
  events.forEach((event, index) => {
    let currStartTime = moment(event.start.dateTime);
    let currEndTime = moment(event.end.dateTime);

    // If there is unknown time at the start of the day
    if (
      prevStartTime === startTime &&
      prevEndTime === startTime &&
      startTime.isBefore(currStartTime)
    ) {
      timeSlots.push({
        start: startTime.format(),
        end: currStartTime.format(),
        type: 'unknown',
        claimed: false,
      });
    }

    // If the current event is free and overlaps with the previous event
    if (event.available === 'free' && currStartTime < prevEndTime) {
      currStartTime.add(prevEndTime.diff(currStartTime));

      const currDuration = currEndTime.diff(currStartTime);

      if (currDuration > 0) {
        timeSlots.push({
          start: currStartTime.format(),
          end: currEndTime.format(),
          type: 'free',
          claimed: false,
        });
      }
    }
    // If the current event is free and does not overlap with the previous event
    else if (event.available === 'free') {
      timeSlots.push({
        start: currStartTime.format(),
        end: currEndTime.format(),
        type: 'free',
        claimed: false,
      });
    }

    // If the current event is busy and overlaps with the previous event
    if (
      event.available === 'busy' &&
      prevEventType === 'free' &&
      currStartTime < prevEndTime
    ) {
      prevEndTime.subtract(prevEndTime.diff(currStartTime));

      const prevDuration = prevEndTime.diff(prevStartTime);

      if (prevDuration > 0) {
        timeSlots[timeSlots.length - 1] = {
          start: prevStartTime.format(),
          end: prevEndTime.format(),
          type: 'free',
          claimed: false,
        };
      } else {
        timeSlots.pop();
      }

      timeSlots[timeSlots.length] = {
        start: currStartTime.format(),
        end: currEndTime.format(),
        type: 'busy',
        claimed: false,
      };
    }
    // If the current event is busy and does not overlap with the previous event
    else if (event.available === 'busy') {
      timeSlots[timeSlots.length] = {
        start: currStartTime.format(),
        end: currEndTime.format(),
        type: 'busy',
        claimed: false,
      };
    }

    prevStartTime = currStartTime;
    prevEndTime = currEndTime;
    prevEventType = event.available;

    // If there is unknown time between the time slots
    if (timeSlots.length > 1) {
      const currSlot = timeSlots[timeSlots.length - 1];
      const prevSlot = timeSlots[timeSlots.length - 2];

      const slotDiff = moment(currSlot.start).diff(prevSlot.end);

      if (slotDiff > 0) {
        timeSlots.splice(timeSlots.length - 2, 0, {
          start: prevSlot.end,
          end: moment(prevSlot.end).add(slotDiff).format(),
          type: 'unknown',
          claimed: false,
        });
      }
    }

    // If there is unknown time at the end of the day
    if (index === events.length - 1 && currEndTime.isBefore(endTime)) {
      timeSlots.push({
        start: currEndTime.format(),
        end: endTime.format(),
        type: 'unknown',
        claimed: false,
      });

      if (timeSlots.length > 1) {
        const currSlot = timeSlots[timeSlots.length - 1];
        const prevSlot = timeSlots[timeSlots.length - 2];

        const slotDiff = moment(currSlot.start).diff(prevSlot.end);

        if (slotDiff > 0) {
          timeSlots.splice(timeSlots.length - 2, 0, {
            start: prevSlot.end,
            end: moment(prevSlot.end).add(slotDiff).format(),
            type: 'unknown',
            claimed: false,
          });
        }
      }
    }
  });

  // Make sure the time slots are sorted
  timeSlots.sort((a, b) => moment(a.start).diff(b.start));

  // If there are no events
  if (timeSlots.length === 0) {
    timeSlots.push({
      start: startTime.format(),
      end: endTime.format(),
      type: 'unknown',
      claimed: false,
    });
  }

  // Merge time slots of the same type
  for (let i = 1; i < timeSlots.length; i++) {
    const curr = timeSlots[i];
    const prev = timeSlots[i - 1];

    if (curr.type === prev.type) {
      const newSlot: EventTimeSlot = {
        start: prev.start,
        end: curr.end,
        type: curr.type,
        claimed: false,
      };
      timeSlots.splice(i - 1, 2, newSlot);
      i--;
    }
  }

  return timeSlots;
};
