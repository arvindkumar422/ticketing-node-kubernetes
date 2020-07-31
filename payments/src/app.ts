import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import 'express-async-errors';

import { errorHandle, currentUserMw } from '@arvindtix/common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    //secure: process.env.NODE_ENV !== 'test', //set to false when on a test env to make testing easier; true otherwise to enforce https
    secure: false,
    signed: false
}));

app.use(currentUserMw);

app.use(createChargeRouter);

app.use(errorHandle);

export {app};