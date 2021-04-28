import { Request, Response, NextFunction } from 'express-serve-static-core';

// add logger middleware to express app
// here we can check for queries in the URI but params cannot be resolved since
// the route path isn't resolved yet
export function logger_middleware(request:Request, _res:Response, next:NextFunction) {
    // log all request entities
    console.log(`${request.method}: ${request.path} Params: ${JSON.stringify(request.params)} Query: ${JSON.stringify(request.query)}`);
    next();
}