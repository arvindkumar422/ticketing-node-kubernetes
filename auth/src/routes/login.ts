import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

import { User } from '../models/user';
import { GenericError, validateReq } from '@arvindtix/common';

import jwt from 'jsonwebtoken';
import { PasswordMgr } from '../middleware/password';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email').isEmail().withMessage('Enter valid email'),
        body('password').trim().notEmpty().withMessage('Password must not be empty')
    ],
    validateReq,
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            throw new GenericError('User doesn\'t exist');
        }

        const pwdMatch = await PasswordMgr.compare(user.password, password);

        if(!pwdMatch) {
            throw new GenericError('Invalid username/password');
        }

        //jwt token
        const token = jwt.sign({ id: user.id, email: user.email },
            process.env.JWT_KEY!);

        req.session = {
            jwt: token
        }

        res.status(200).send(user);

    });

export { router as loginRouter }