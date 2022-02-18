import process from 'node:process';

import config from 'config';

import app from './src/app';

app.listen(process.env.PORT || config.port);
