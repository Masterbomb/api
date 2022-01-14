import express from 'express';
import morgan from 'morgan';
import { routes } from "./v1/routes";
import { Response, Request, NextFunction } from 'express';
import { validationResult } from "express-validator";

interface Error {
	message: string;
	statusCode: number;
}

const handleError = (err:Error, _req:Request, res:Response) => {
  res.status(err.statusCode || 500).send(err.message);
};

const app = express();
// setup logging middleware
app.use(morgan("combined"));

// use express types (make sure this is defined in front of the routes!)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes.forEach(route => {
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  (app as any)[route.method](
    route.route,
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
        return next(err);
      }
    });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  /* eslint-enable  @typescript-eslint/no-unsafe-call */
});

app.use(handleError);

export default app;