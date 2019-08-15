import { expect } from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import bunyan from 'bunyan';
import { logger } from '../../src/logger';

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Logger', () => {
    let actualLogger,
        expectedLogger;

    beforeEach(() => {
        expectedLogger = chance.string();
        sandbox.stub(bunyan, 'createLogger').returns(expectedLogger);
        actualLogger = logger();
    });

    afterEach(() => sandbox.restore());

    it('should create a logger a name', () => {
        expect(bunyan.createLogger).to.have.been.calledWith({ name: 'express-gcp' });
    });

    it('should return a logger', () => {
        expect(actualLogger).to.be.equal(expectedLogger);
    });
});