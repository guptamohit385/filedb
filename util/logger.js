'use strict';

//Log levels
const LOG_LEVEL_ERROR = 'ERROR';
const LOG_LEVEL_WARN = 'WARN';
const LOG_LEVEL_INFO = 'INFO';
const LOG_LEVEL_DEBUG = 'DEBUG';

var logger = {};

/**
 * Logs with INFO log level
 */
logger.info = (comp, trackingId, messageJson) => {
    logger.consoleLogger(LOG_LEVEL_INFO, comp, trackingId, messageJson)
}

/**
 * Logs with ERROR log level
 */
logger.error = (comp, trackingId, messageJson) => {
    logger.consoleLogger(LOG_LEVEL_ERROR, comp, trackingId, messageJson)
}

/**
 * Logs with WARN log level
 */
logger.warn = (comp, trackingId, messageJson) => {
    logger.consoleLogger(LOG_LEVEL_WARN, comp, trackingId, messageJson)
}

/**
 * Logs with DEBUG log level
 */
logger.debug = (comp, trackingId, messageJson) => {
    logger.consoleLogger(LOG_LEVEL_DEBUG, comp, trackingId, messageJson)
}

logger.consoleLogger = (logLevel, comp, trackingId, messageJson) => {
    console.log({
      logLevel: logLevel,
      comp: comp,
      reqId: trackingId,
      msg: messageJson
    });
}

module.exports = logger;