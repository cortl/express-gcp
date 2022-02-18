import process from 'node:process';

import config from 'config';

const app = require('./src/app.js');

app.default.listen(process.env.PORT || config.port);
