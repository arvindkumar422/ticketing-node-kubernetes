import { AbstractError } from './abstracterror';

export class NotAuthorizedError extends AbstractError {
  statusCode = 401;

  constructor() {
    super();

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize() {
    return [{ msg: 'User not authorized' }];
  }
}
