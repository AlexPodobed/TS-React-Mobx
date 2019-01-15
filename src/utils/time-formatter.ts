import * as moment from 'moment';

const DEFAULT_TIME_FORMAT = 'DD MMM YY';

export const formatTime = (timestamp: string | number): string => {
  return moment(timestamp).format(DEFAULT_TIME_FORMAT);
};
