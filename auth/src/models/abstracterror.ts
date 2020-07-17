abstract class AbstractError extends Error {
    abstract statusCode: number;

    constructor() {
        super();

        Object.setPrototypeOf(this, AbstractError.prototype);
    }

    abstract serialize(): {msg: string, field?: string}[]

}

export {AbstractError};