import express from 'express';
import { json } from 'body-parser';

import { currentuserRouter } from './routes/currentuser';
import { registerRouter } from './routes/register';
import { loginRouter } from './routes/login';
import { logoutRouter } from './routes/logout';

import { errorHandle } from './middleware/errorhandler';

const app = express();
app.use(json());

app.use(currentuserRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter);

app.use(errorHandle);

app.listen(3000, () => {
    console.log("Listening on 3000!!");
});