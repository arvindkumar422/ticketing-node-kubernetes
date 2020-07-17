import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { ReqValidationError } from '../models/validationerror';
import { DbError } from '../models/dberror';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('Enter valid email'),
        body('password').trim().isLength({ min: 1 }).withMessage('Password must be atleast 1 character long')
    ],
    (req: Request, res: Response) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            throw new ReqValidationError(err.array());
        }
        console.log("Creating new user");
        throw new DbError();
        res.send('signup');
    });

export { router as registerRouter }