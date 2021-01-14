const { createLogger, format, transports } = require('winston');
const path = require('path');

const {
    dateEnum: { LOGS_DATE_FORMAT },
    folderFileNamesEnum: {
        DAY_TXT, ERRORS, INFORMATION, LOGS, MONTH_TXT
    },
    winstonEnum: {
        GREEN, ERROR, INFO, RED
    }
} = require('../constants');

const LEVEL = Symbol.for('level');

module.exports = (label) => {
    /** Log only the messages the match `level`. */
    function filterOnly(level) {
        return format((info) => {
            if (info[LEVEL] === level) {
                return info;
            }
        })();
    }

    const consoleOptions = {
        level: INFO,
        format: format.colorize({ colors: { error: RED, info: GREEN }, all: true })
    };

    const fileErrorsOptions = {
        level: ERROR,
        filename: path.join(process.cwd(), LOGS, ERRORS, DAY_TXT),
        format: format.json({ space: 2 })
    };

    const fileRefreshTokenControlOptions = {
        level: INFO,
        filename: path.join(process.cwd(), LOGS, INFORMATION, MONTH_TXT),
        format: format.combine(
            filterOnly(INFO),
            format.json({ space: 2 })
        )
    };

    const myFormat = format.printf(({ level, message, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`);

    const logger = createLogger({
        format: format.combine(
            format.timestamp({ format: LOGS_DATE_FORMAT }),
            format.label({ label }),
            myFormat
        ),
        transports: [
            new transports.Console(consoleOptions),
            new transports.File(fileErrorsOptions),
            new transports.File(fileRefreshTokenControlOptions)
        ]
    });

    return {
        error: (err) => logger.error({ message: err.message, ...err }),
        info: (msg) => logger.info(msg)
    };
};
