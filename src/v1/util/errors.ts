/* eslint-disable max-classes-per-file */
export class HTTPError extends Error {

  // default http error
  statusCode:number;

  constructor(msg: string, statusCode=500) {
      super(msg);
      this.statusCode = statusCode;
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, ResourceNotFound.prototype);
  }
}

export class ResourceNotFound extends HTTPError {
  constructor(msg: string) {
      super(msg, 404);
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, ResourceNotFound.prototype);
  }
}

export class BadQuery extends HTTPError {
  constructor(msg: string) {
      super(msg, 401);
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, ResourceNotFound.prototype);
  }
}