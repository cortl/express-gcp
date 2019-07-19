import { expect } from 'chai';
import sinon from 'sinon';
import express from 'express';
import indexRouter from '../../../src/routes/index';

const sandbox = sinon.createSandbox();

describe('Index Router', () => {
    let expressRouter,
        res;

    beforeEach(() => {
        expressRouter = {
            get: sandbox.stub(),
            post: sandbox.stub()
        };
        sandbox.stub(express, 'Router').returns(expressRouter);

        res = {};
        res.send = sandbox.stub().returns(res);

        indexRouter();
    });

    afterEach(() => sandbox.restore());

    it('should set up a router', () => {
        expect(expressRouter.get).to.have.been.calledWithExactly('/', sinon.match.func);
    });

    describe('GET /', () => {
        let getPage;

        beforeEach(() => {
            getPage = expressRouter.get.firstCall.args[1];

            getPage('', res);
        });

        it('should return hello world', () => {
            expect(res.send).to.have.been.calledWith('Hello World!');
        });
    });
});