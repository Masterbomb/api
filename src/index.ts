import express from 'express';
import createError from 'http-errors';
import api_routes from './v1';
import dotenv from "dotenv";
import { postgres } from './db';
import { logger_middleware } from './v1/middlewares/logger';
import { NextFunction, Response, Request } from 'express';

// load environment settings
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

// connect db
postgres.connect_db();

const app = express();
// setup view engine
app.use(logger_middleware);
// use express types (make sure this is defined in front of the routes!)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(api_routes);

// start webserver
app.listen(port, () => {
    console.log(`server started at http://localhost:${ port }`);
});

app.use((_req:Request, _res:Response, next:NextFunction) => {
    // forward 404 error
    next(createError(404));
});
