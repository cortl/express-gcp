import process from 'node:process';

import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import config from 'config';

import indexRouter from './routes';
import logger from './utils/logger.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter());

logger.info(`application started successfully on port: ${process.env.PORT || config.get('port')}`);

export default app;
