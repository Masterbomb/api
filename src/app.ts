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
        res.json(result);
      } catch(err) {
        next(err);
      }
    });
});

app.use(handleError);

export default app;