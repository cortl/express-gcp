import Chance from 'chance';
import config from 'config';
import { Logging, loggingStub, logStub } from '@google-cloud/logging'

import logger from '../../../src/utils/logger';

const chance = new Chance();

jest.useFakeTimers();

describe('Logger', () => {
    const defaultMetadata = {
        resource: {
            labels: {
                'module_id': 'default',
                'project_id': config.get('PROJECT_ID'),
            },
            type: 'gae_app',
        },
    };

    afterEach(jest.clearAllMocks);

    describe('logging', () => {
        let message,
            metadata,
            entry;

        beforeEach(() => {
            message = chance.sentence();
            metadata = { [chance.word()]: chance.string() };
            entry = chance.sentence();

            logStub.entry.mockReturnValue(entry);
        });

        describe('info', () => {
            beforeEach(() => {
                logger.info(message, metadata);
            });

            it('should create a Google Logging instance with project id', () => {
                expect(Logging).toHaveBeenCalledWith({ projectId: config.get('PROJECT_ID') });
            });

            it('should log to the log', () => {
                expect(loggingStub.log).toHaveBeenCalledWith('log');
            });

            it('should write an info entry', () => {
                expect(logStub.entry).toHaveBeenCalledWith({
                    ...defaultMetadata,
                    severity: 'NOTICE',
                }, { ...metadata, message });
            });

            it('should write the log', () => {
                expect(logStub.write).toHaveBeenCalledWith(entry);
            });
        });

        describe('error', () => {
            beforeEach(() => {
                logger.error(message, metadata);
            });

            it('should write an error entry', () => {
                expect(logStub.entry).toHaveBeenCalledWith({
                    ...defaultMetadata,
                    severity: 'ERROR',
                }, { ...metadata, message });
            });

            it('should write the log', () => {
                expect(logStub.write).toHaveBeenCalledWith(entry);
            });
        });

        describe('timing', () => {
            let label;

            beforeEach(() => {
                label = chance.word();
                logger.time(label);

                const time = chance.natural({ max: 10_000, min: 100 });

                jest.advanceTimersByTime(time);

                logger.timeEnd(label, metadata);

                message = `${label}: ${time}ms`;
            });

            it('should write an info entry', () => {
                expect(logStub.entry).toHaveBeenCalledWith({
                    ...defaultMetadata,
                    severity: 'NOTICE',
                }, { ...metadata, message });
            });

            it('should write the log', () => {
                expect(logStub.write).toHaveBeenCalledWith(entry);
            });

            describe('after timing has already ended', () => {
                it('should not allow timeEnd to be called again', () => {
                    let actualError;

                    try {
                        logger.timeEnd(label);
                    } catch (error) {
                        actualError = error;
                    } finally {
                        expect(actualError).toStrictEqual(new Error(`time start does not exist for ${label}`))
                    }
                });
            });
        });
    });
});
