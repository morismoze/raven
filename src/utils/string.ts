import * as timeago from 'timeago.js';

export const formatNumber = (number?: number) => {
  if (!number) {
    return;
  }

  const formatter = Intl.NumberFormat();
  return formatter.format(number);
};

export const formatCreatedAt = (date?: string) => {
  if (!date) {
    return;
  }

  const dateObj = new Date(date);
  return timeago.format(dateObj);
};
