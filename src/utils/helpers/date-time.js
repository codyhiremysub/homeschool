/* eslint-disable import/prefer-default-export */
export const getDurationInDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (
    startDate === 'Invalid Date' ||
    endDate === 'Invalid Date' ||
    startDate?.toISOString() > endDate?.toISOString()
  ) {
    return null;
  }

  const difference = endDate.getTime() - startDate.getTime();

  return Math.ceil(difference / (1000 * 60 * 60 * 24) + 1);
};
