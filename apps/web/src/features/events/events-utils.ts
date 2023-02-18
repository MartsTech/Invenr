import {CalendarEvent} from './events-types';

export const resolveScheduleConflicts = (
  events: CalendarEvent[],
): CalendarEvent[] => {
  // Sort events by start time
  events.sort(
    (a, b) =>
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime(),
  );

  const freeSlots: Array<{
    start: Date;
    end: Date;
  }> = [];

  const date = new Date(events[0].start.dateTime);

  // Get 00:00:00 of the current date
  let startTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
    0,
    0,
    0,
  ).getTime();

  // Get 23:59:59 of the current date
  let endTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
    23,
    59,
    59,
  ).getTime();

  let prevTime = startTime;

  // Find free slots between events (no busy events and free time are considered as free slots)
  events.forEach((event, index) => {
    const currTime = new Date(event.start.dateTime).getTime();

    if (
      event.available === 'busy' &&
      currTime > startTime &&
      prevTime <= currTime
    ) {
      freeSlots.push({
        start: new Date(startTime),
        end: new Date(currTime),
      });
      prevTime = currTime;
      startTime = new Date(event.end.dateTime).getTime();
    }

    if (
      index === events.length - 1 &&
      currTime < endTime &&
      currTime > prevTime
    ) {
      freeSlots.push({
        start: new Date(startTime),
        end: new Date(endTime),
      });
    }
  });

  console.warn('Free slots', freeSlots);

  // Find conflicts
  for (let i = 1; i < events.length; i++) {
    let prev = events[i - 1];
    let curr = events[i];

    // There is no conflict if both events are busy
    if (prev.available === 'busy' && curr.available === 'busy') {
      continue;
    }

    // There is no conflict if the current event starts after the previous event ends
    if (
      new Date(prev.end.dateTime).getTime() <=
        new Date(curr.start.dateTime).getTime() &&
      new Date(prev.start.dateTime).getTime() !==
        new Date(curr.start.dateTime).getTime() &&
      new Date(prev.end.dateTime).getTime() !==
        new Date(curr.end.dateTime).getTime()
    ) {
      continue;
    }

    // If the current event is busy, we move the previous event to the closest free slot
    curr = curr.available === 'busy' ? prev : curr;

    // Find the free slot that is closest to the current event
    let closestSlot: {start: Date; end: Date} | null = null;

    for (let j = 0; j < freeSlots.length; j++) {
      const slot = freeSlots[j];

      if (
        new Date(slot.start).getTime() >=
        new Date(curr.start.dateTime).getTime()
      ) {
        closestSlot = slot;
        break;
      }
    }

    if (!closestSlot) {
      continue;
    }

    const currDuration =
      new Date(curr.end.dateTime).getTime() -
      new Date(curr.start.dateTime).getTime();

    const slotDuration =
      closestSlot.end.getTime() - closestSlot.start.getTime();

    // If the closest free slot is longer than the current event, then
    // we can move the current event to the closest free slot
    if (slotDuration > currDuration) {
      const endDate = new Date(
        new Date(closestSlot.end).getTime() - (slotDuration - currDuration),
      );
      curr.start.dateTime = closestSlot.start.toISOString();
      curr.end.dateTime = endDate.toISOString();
    } else if (slotDuration >= 900000) {
      // If the closest free slot is shorter than the current event, but longer than 15 minutes,
      // then we can move the current event to the closest free slot and split the free slot
      // into two parts

      const splitEvent: CalendarEvent = {
        ...curr,
        start: {
          dateTime: closestSlot.end.toISOString(),
        },
        end: {
          dateTime: new Date(
            closestSlot.end.getTime() + (currDuration - slotDuration),
          ).toISOString(),
        },
      };

      events.splice(i, 0, splitEvent);

      curr.start.dateTime = closestSlot.start.toISOString();
      curr.end.dateTime = closestSlot.end.toISOString();
    } else {
      console.error('No free slots');
    }
  }

  return events;
};
