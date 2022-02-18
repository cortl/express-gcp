import express from 'express';

import indexRouter from '../../../src/routes';

describe('Index Router', () => {
    let expressRouter,
        res;

    beforeEach(() => {
        expressRouter = {
            get: jest.fn(),
            post: jest.fn(),
        };
        
        express.Router.mockReturnValue(expressRouter)

        res = {};
        res.send = jest.fn().mockReturnValue(res);

        indexRouter();
    });

    afterEach(jest.clearAllMocks);

    it('should set up a router', () => {
        expect(expressRouter.get).toHaveBeenCalledTimes(1);
        expect(expressRouter.get).toHaveBeenCalledWith('/', expect.any(Function));
    });

    describe('GET /', () => {
        let get;

        beforeEach(() => {
            get = expressRouter.get.mock.calls[0][1];

            get('', res);
        });

        it('should return hello world', () => {
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledWith('Hello World!');
        });
    });
});
