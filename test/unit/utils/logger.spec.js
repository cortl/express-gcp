import {expect} from 'chai';
import * as Sinon from 'sinon';
import Chance from 'chance';
import proxyquire from 'proxyquire';
import config from 'config';

const sandbox = Sinon.createSandbox();
const chance = new Chance();

describe('Logger', () => {
    let logger,
        logging,
        log,
        GoogleLogging;

    const defaultMetadata = {
        resource: {
            labels: {
                'module_id': 'default',
                'project_id': config.get('PROJECT_ID'),
            },
            type: 'gae_app',
        },
    };

    beforeEach(() => {
        log = {
            entry: sandbox.stub(),
            write: sandbox.stub(),
        };
        logging = {
            log: sandbox.stub().returns(log),
        };
        GoogleLogging = sandbox.stub().returns(logging);

        logger = proxyquire('../../../src/utils/logger', {
            '@google-cloud/logging': {
                Logging: GoogleLogging,
            },
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
                    severity: 'NOTICE',
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
                    severity: 'ERROR',
                }, {...metadata, message});
            });

            it('should write the log', () => {
                expect(log.write).to.have.been.calledWithExactly(entry);
            });
        });

        describe('timing', () => {
            let label;

            beforeEach(() => {
                const clock = Sinon.useFakeTimers(Date.now());

                label = chance.word();
                logger.time(label);

                const time = chance.natural({max: 10_000, min: 100});

                clock.tick(time);

                logger.timeEnd(label, metadata);

                message = `${label}: ${time}ms`;
            });

            it('should write an info entry', () => {
                expect(log.entry).to.have.been.calledWithExactly({
                    ...defaultMetadata,
                    severity: 'NOTICE',
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
