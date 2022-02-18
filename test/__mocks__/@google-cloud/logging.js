const logging = jest.createMockFromModule('@google-cloud/logging');

const logStub = {
    entry: jest.fn(),
    write: jest.fn(),
};
const loggingStub = {
    log: jest.fn().mockReturnValue(logStub),
};
const LoggingStub = jest.fn().mockReturnValue(loggingStub);

logging.Logging = LoggingStub;

export { LoggingStub as Logging, logStub, loggingStub };
export default logging;
