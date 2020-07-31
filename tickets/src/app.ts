import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import 'express-async-errors';

import { errorHandle, currentUserMw } from '@arvindtix/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/tickets';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(cookieSession({
    //secure: process.env.NODE_ENV !== 'test', //set to false when on a test env to make testing easier; true otherwise to enforce https
    secure: false, 
    signed: false
}));

app.use(currentUserMw);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.use(errorHandle);

export { app };