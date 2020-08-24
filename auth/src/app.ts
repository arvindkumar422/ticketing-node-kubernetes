import express from 'express';
import { json } from 'body-parser';

import 'express-async-errors';

import { currentuserRouter } from './routes/currentuser';
import { registerRouter } from './routes/register';
import { loginRouter } from './routes/login';
import { logoutRouter } from './routes/logout';
import cookieSession from 'cookie-session';

import { errorHandle } from '@arvindtix/common';

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    //secure: process.env.NODE_ENV !== 'test', //set to false when on a test env to make testing easier; true otherwise to enforce https
    secure: false,
    signed: false
}));

app.use(currentuserRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter);

app.use(errorHandle);

export {app};