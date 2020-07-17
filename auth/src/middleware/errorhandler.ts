import express, { Request, Response, NextFunction } from 'express';

import { AbstractError } from '../models/abstracterror';

const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AbstractError) {
        return res.status(err.statusCode).send({errors: err.serialize()});
    }
    res.status(400).send({errors: [{msg: "Oops, something went wrong :("}]})
}

export { errorHandle };