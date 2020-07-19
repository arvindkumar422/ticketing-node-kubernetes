import {AbstractError} from './abstracterror';

class DbError extends AbstractError {

    dberror: string = "Database error";
    statusCode: number = 500;

    constructor() {
        super();

        Object.setPrototypeOf(this, DbError.prototype);
    }

    serialize = () => {
        return [{msg: this.dberror}];
    }
    
}

export {DbError}