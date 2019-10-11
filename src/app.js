import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import config from 'config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter());

console.info(`application started successfully on port: ${process.env.PORT || config.get('port')}`);

export default app;
