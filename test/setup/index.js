import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import logger from '../../src/utils/logger';

sinon.stub(logger, 'info');
sinon.stub(logger, 'error');
sinon.stub(logger, 'time');
sinon.stub(logger, 'timeEnd');

chai.use(chaiHttp);
chai.use(sinonChai);