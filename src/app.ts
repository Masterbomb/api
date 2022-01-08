import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from "./v1";
import cors from "cors";
import { port } from "./config";
import { Response, Request, NextFunction } from 'express';
import { validationResult } from "express-validator";
import { HTTPError } from "./v1/util/errors";
import { HTTPRequests } from './v1/routes/interfaces';

/**
 * Principle JSON formatted error response. Convert all general errors to HTTPErrors.
 *
 * @param _err Error thrown on server
 * @param _req request type
 * @param res response object
 * @param _next next middleware
 */
const handleError = (_err:Error, _req:Request, res:Response, _next: NextFunction) => {
  const err:HTTPError = (!(_err instanceof HTTPError))? new HTTPError(_err.message):_err;
  res.setHeader('Content-Type', 'application/json');
  res.status(err.statusCode).send({ status:err.statusCode, error: err.message});
};

const specs = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MasterBom API",
      version: "1.0.0",
      description: "Composite bill of materials",
    },
    servers: [
      {
        url: `http://localhost:${ port }/v1`,
      },
    ],
  },
  apis: [
    "**/*.ts"
  ],
});
const app = express();

// setup logging middleware
app.use(morgan("dev"));
app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));
// use express types (make sure this is defined in front of the routes!)
app.use(express.json());
// The other middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
routes.forEach(route => {
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  (app as any)[route.method](
    route.path,
    ...route.validation,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const result = await (new (route.controller )())[route.action](req, res, next);
        // custom success response for each http request type
        if (route.method === HTTPRequests.delete) {
          return res.status(204).send();
        } else if (route.method === HTTPRequests.post || route.method === HTTPRequests.put){
          return res.status(201).send(result);
        } else {
          return res.json(result);
        }
      } catch(err) {
        console.log(err.statusCode);
        next(err);
        return undefined;
      }
    });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  /* eslint-enable  @typescript-eslint/no-unsafe-call */
});
app.use(handleError);

export default app;