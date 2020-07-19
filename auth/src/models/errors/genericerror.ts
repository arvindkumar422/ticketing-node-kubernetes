import {AbstractError} from './abstracterror';

class GenericError extends AbstractError {

    statusCode: number = 400;

    constructor(public msg : string) {
        super();

        Object.setPrototypeOf(this, GenericError.prototype);
    }

    serialize() {
        return [{ msg: this.msg }]
    }

}

export {GenericError};