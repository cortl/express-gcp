import process from 'node:process';

import config from 'config';

import app from './src/app.js';

app.listen(process.env.PORT || config.port);
