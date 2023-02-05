export const getWeekDates = (isoString: string) => {
  let date = new Date(isoString);
  let day = date.getUTCDay();
  let diff = date.getUTCDate() - day + 7;
  let first = new Date(date.setUTCDate(diff));
  let last = new Date(first.getTime() + 6 * 24 * 60 * 60 * 1000);

  return {
    first: first.toISOString(),
    last: last.toISOString(),
  };
};
