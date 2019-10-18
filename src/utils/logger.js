import {Logging} from '@google-cloud/logging';
import config from 'config';

const logging = new Logging({projectId: config.get('PROJECT_ID')});
const log = logging.log('log');

const severity = {
    info: 'NOTICE',
    error: 'ERROR'
};

const getMetadata = severity => ({
    resource: {
        type: 'gae_app',
        labels: {
            'project_id': config.get('PROJECT_ID'),
            'module_id': 'default'
        }
    },
    severity
});

const logWithSeverity = (severity, jsonPayload) => {
    const entry = log.entry(getMetadata(severity), jsonPayload);
    log.write(entry);
};

const error = (message, metadata) => {
    logWithSeverity(severity.error, {...metadata, message});
    console.error(message);
};

const info = (message, metadata) => {
    logWithSeverity(severity.info, {...metadata, message});
    console.log(message);
};

const timeData = {};

const time = label => {
    timeData[label] = new Date();
};

const timeEnd = (label, metadata) => {
    const startTime = timeData[label];
    if (startTime) {
        const diff = new Date() - timeData[label];
        delete timeData[label];
        const message = `${label}: ${diff}ms`;
        info(message, metadata);
    } else {
        throw new Error(`time start does not exist for ${label}`);
    }
};

export default {
    error,
    info,
    time,
    timeEnd
};
