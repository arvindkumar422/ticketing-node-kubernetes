import { ValidationError } from 'express-validator';

import {AbstractError} from './abstracterror';

class ReqValidationError extends AbstractError {

    statusCode: number = 400;

    constructor(public errors: ValidationError[]) {
        super();

        Object.setPrototypeOf(this, ReqValidationError.prototype);
    }

    serialize = () => {
        return this.errors.map(element => { return {msg: element.msg, field: element.param} });
    }
    
}

export {ReqValidationError}