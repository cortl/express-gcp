import {expect} from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import proxyquire from 'proxyquire';
import config from 'config';

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Logger', () => {
    let logger,
        logging,
        log,
        GoogleLogging;

    const defaultMetadata = {
        resource: {
            type: 'gae_app',
            labels: {
                'project_id': config.get('PROJECT_ID'),
                'module_id': 'default'
            }
        }
    };
    beforeEach(() => {
        log = {
            entry: sandbox.stub(),
            write: sandbox.stub()
        };
        logging = {
            log: sandbox.stub().returns(log)
        };
        GoogleLogging = sandbox.stub().returns(logging);

        logger = proxyquire('../../../src/utils/logger', {
            '@google-cloud/logging': {
                Logging: GoogleLogging
            }
        }).default;
    });

    afterEach(() => sandbox.restore());

    it('should create a Google Logging instance with project id', () => {
        expect(GoogleLogging).to.have.been.calledOnceWithExactly({projectId: config.get('PROJECT_ID')});
    });

    it('should log to the log', () => {
        expect(logging.log).to.have.been.calledOnceWithExactly('log');
    });

    describe('logging', () => {
        let message,
            metadata,
            entry;

        beforeEach(() => {
            message = chance.sentence();
            metadata = {[chance.word()]: chance.string()};
            entry = chance.sentence();

            log.entry.returns(entry);
        });

        describe('info', () => {
            beforeEach(() => {
                logger.info(message, metadata);
            });

            it('should write an info entry', () => {
                expect(log.entry).to.have.been.calledWith({
                    ...defaultMetadata,
                    severity: 'NOTICE'
                }, {...metadata, message});
            });

            it('should write the log', () => {
                expect(log.write).to.have.been.calledWithExactly(entry);
            });
        });

        describe('error', () => {
            beforeEach(() => {
                logger.error(message, metadata);
            });

            it('should write an error entry', () => {
                expect(log.entry).to.have.been.calledWith({
                    ...defaultMetadata,
                    severity: 'ERROR'
                }, {...metadata, message});
            });

            it('should write the log', () => {
                expect(log.write).to.have.been.calledWithExactly(entry);
            });
        });

        describe('timing', () => {
            let label,
                time,
                message;

            beforeEach(() => {
                const clock = sinon.useFakeTimers(new Date().getTime());
                label = chance.word();
                logger.time(label);

                const time = chance.natural({min: 100, max: 10000})
                clock.tick(time);

                logger.timeEnd(label, metadata);

                message = `${label}: ${time}ms`;
            });

            it('should write an info entry', () => {
                expect(log.entry).to.have.been.calledWithExactly({
                    ...defaultMetadata,
                    severity: 'NOTICE'
                }, {...metadata, message});
            });

            it('should write the log', () => {
                expect(log.write).to.have.been.calledWithExactly(entry);
            });

            describe('after timing has already ended', () => {
                it('should not allow timeEnd to be called again', () => {
                    expect(() => logger.timeEnd(label)).to.throw(Error, `time start does not exist for ${label}`);
                });
            });
        });
    });
});