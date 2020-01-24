import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import config from 'config';

import indexRouter from './routes/index';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter());

console.info(`application started successfully on port: ${process.env.PORT || config.get('port')}`);

export default app;
