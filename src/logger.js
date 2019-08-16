import bunyan from 'bunyan';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';

export const logger = (name = 'express-gcp') => {
    const loggingBunyan = new LoggingBunyan();
    return bunyan.createLogger({
        name,
        streams: [
            { stream: process.stdout, level: 'info' },
            loggingBunyan.stream('info')
        ]
    });
};