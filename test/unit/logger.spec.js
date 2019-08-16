import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import bunyan from 'bunyan';
import { logger } from '../../src/logger';
import * as GoogleBunyan from '@google-cloud/logging-bunyan';

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Logger', () => {
    let actualLogger,
        expectedLogger,
        googleStream;

    beforeEach(() => {
        expectedLogger = chance.string();
        googleStream = chance.string();
        sandbox.stub(bunyan, 'createLogger').returns(expectedLogger);
        sandbox.stub(GoogleBunyan, 'LoggingBunyan').returns({
            stream: sandbox.stub().returns(googleStream)
        });
        actualLogger = logger();
    });

    afterEach(() => sandbox.restore());

    describe('when a name is given to the logger', () => {
        let name;

        beforeEach(() => {
            name = chance.word();
            actualLogger = logger(name);
        });

        it('should use the given name', () => {
            expect(bunyan.createLogger).to.have.been.calledWith({
                name,
                streams: sinon.match.array
            });
        });
    });

    describe('when a name is not given to the logger', () => {
        beforeEach(() => {
            actualLogger = logger();
        });

        it('should use a default name', () => {
            expect(bunyan.createLogger).to.have.been.calledWith({
                name: 'express-gcp',
                streams: sinon.match.array
            });
        });
    });

    it('should construct a bunyan logger', () => {
        expect(bunyan.createLogger).to.have.been.calledWith({
            name: sinon.match.any,
            streams: [
                { stream: process.stdout, level: 'info' },
                googleStream
            ]
        });
    });

    it('should return a logger', () => {
        expect(actualLogger).to.be.equal(expectedLogger);
    });

    it('should create a logging bunyan', () => {
        expect(GoogleBunyan.LoggingBunyan).to.have.been.calledOnce;
        expect(GoogleBunyan.LoggingBunyan().stream).to.have.been.calledOnceWith('info');
    });

});