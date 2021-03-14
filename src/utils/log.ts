import { isProduction } from './utils';
import { createLogger, format, transports } from 'winston';

const errorStackFormat = format(info => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }

  return info;
});

const logger = createLogger({
  level: isProduction() ? 'info' : 'debug',
  format: format.combine(errorStackFormat(), format.splat(), format.simple()),
  transports: [new transports.Console({})],
});

export default logger;
