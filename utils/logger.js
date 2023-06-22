const { createLogger, format, transports } = require('winston');

const createCustomLogger = (fileDir) => {
  return createLogger({
    transports: new transports.File({
      filename: fileDir,
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      ),
    }),
  });
};

module.exports.eventLogger = createCustomLogger('logs/server.log');
module.exports.authorLikesLogger = createCustomLogger(`logs/authorPopularity/likesCount.log`);
