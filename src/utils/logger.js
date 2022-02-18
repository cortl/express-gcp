import { Logging } from '@google-cloud/logging';
import config from 'config';

const SEVERITY = {
    error: 'ERROR',
    info: 'NOTICE',
};

let logging;

const getLog = () => {
    if (!logging) {
        logging = new Logging({ projectId: config.get('PROJECT_ID') });
    }

    const log = logging.log('log');

    return log;
};

const getMetadata = (severity) => ({
    resource: {
        labels: {
            'module_id': 'default',
            'project_id': config.get('PROJECT_ID'),
        },
        type: 'gae_app',
    },
    severity,
});

const logWithSeverity = (severity, jsonPayload) => {
    const log = getLog();
    const entry = log.entry(getMetadata(severity), jsonPayload);

    log.write(entry);
};

const error = (message, metadata) => {
    logWithSeverity(SEVERITY.error, { ...metadata, message });
    // eslint-disable-next-line no-console
    console.error(message);
};

const info = (message, metadata) => {
    logWithSeverity(SEVERITY.info, { ...metadata, message });
    // eslint-disable-next-line no-console
    console.log(message);
};

const timeData = {};

const time = (label) => {
    timeData[label] = new Date();
};

const timeEnd = (label, metadata) => {
    const startTime = timeData[label];

    if (startTime) {
        const diff = Date.now() - timeData[label];

        delete timeData[label];
        const message = `${label}: ${diff}ms`;

        info(message, metadata);
    } else {
        throw new Error(`time start does not exist for ${label}`);
    }
};

const logger = {
    error,
    info,
    time,
    timeEnd,
};

export default logger;
