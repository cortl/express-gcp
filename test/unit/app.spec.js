import chai, {expect } from 'chai';
import app from '../../src/app';

describe('App', () => {
    let req = {};
    let res = {
        sendCalledWith:'',
        send: (argument) => {
            this.sendCalledWith = argument
        }
    };
    it('should work', () => {
        chai.request(app)
        .get('/')
        .end((_err, res) => {
            expect(res).to.have.status(200);
        });
    });
});