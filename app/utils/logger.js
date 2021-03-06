import winston from 'winston';

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './app/logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false,
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
    ],
    exitOnError: false,
});

export default logger;
