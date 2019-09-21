import * as winston from "winston";
import moment from 'moment'

const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

const localTimestamp = winston.format((info, opts) => {
    info.timestamp = moment().format('DD/MM/YYYY HH:mm:ss')
    return info
})

const loggerOtions: winston.LoggerOptions = {
    level: 'error',
    exitOnError: false,
    format: winston.format.combine(
        winston.format.label({label: 'API'}),
        localTimestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            level: 'silly',
            filename: `./logs/api.log`,
            handleExceptions: true,
            maxsize: 500000,
            maxFiles: 2
        }),
        // new winston.transports.File({
        //     level: 'silly',
        //     filename: `./logs/api.log`,
        //     handleExceptions: true,
        //     maxsize: 500000,
        //     maxFiles: 2
        // }),
        // new winston.transports.Console({level: 'silly'})
    ],
};

const logger: winston.Logger = winston.createLogger(loggerOtions)

export { logger }