import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import * as Sinon from 'sinon';

import logger from '../../src/utils/logger.js';

Sinon.stub(logger, 'info');
Sinon.stub(logger, 'error');
Sinon.stub(logger, 'time');
Sinon.stub(logger, 'timeEnd');

chai.use(chaiHttp);
chai.use(sinonChai);
