import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ReqValidationError } from '../models/errors/validationerror';

const validateReq = (req: Request, res: Response, next: NextFunction) => {

    const err = validationResult(req);
    try {
        if (!err.isEmpty()) {
            throw new ReqValidationError(err.array());
        }
    } catch (e) {
        next(e)
    }

    next();
}

export {validateReq};
