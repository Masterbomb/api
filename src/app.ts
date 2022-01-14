import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from "./v1";
import cors from "cors";
import { port } from "./config";
import { Response, Request, NextFunction } from 'express';
import { validationResult } from "express-validator";

interface Error {
	message: string;
	statusCode: number;
}

const handleError = (err:Error, _req:Request, res:Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).send(err.message);
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
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(handleError);
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
        return res.json(result);
      } catch(err) {
        next(err);
        return undefined;
      }
    });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  /* eslint-enable  @typescript-eslint/no-unsafe-call */
});



export default app;