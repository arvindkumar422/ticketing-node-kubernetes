import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import 'express-async-errors';

import { errorHandle, currentUserMw } from '@arvindtix/common';
import { indexOrderRouter } from './routes/index';
import { showOrderRouter } from './routes/show-order';
import { deleteOrderRouter } from './routes/delete-order';
import { newOrderRouter } from './routes/new-order';


const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    //secure: process.env.NODE_ENV !== 'test', //set to false when on a test env to make testing easier; true otherwise to enforce https
    secure: false,
    signed: false
}));

app.use(currentUserMw);

app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.use(newOrderRouter);

app.use(errorHandle);

export { app };