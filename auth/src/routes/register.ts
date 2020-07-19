import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

import { User } from '../models/user';
import { GenericError } from '../models/errors/genericerror';

import jwt from 'jsonwebtoken';
import { validateReq } from '../middleware/validate-req';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('Enter valid email'),
        body('password').trim().isLength({ min: 2 }).withMessage('Password must be atleast 2 characters long')
    ],
    validateReq,
    async (req: Request, res: Response, next: NextFunction) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        try { 
            if (existingUser) {
                throw new GenericError('User already exists')
            }
        } catch (e) {
            next(e)
        }

        if(!process.env.JWT_KEY) {
            throw new GenericError('No JWT key present present')
        }

        User.build({ email, password }).save().then(element => {
            
            //jwt token
            const token = jwt.sign({ id: element.id, email: element.email },
                process.env.JWT_KEY!);

            req.session = {
                jwt: token
            }
            res.status(201).send(element);
        });

        //userToBeSaved.save();

    });

export { router as registerRouter }