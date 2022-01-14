import express from 'express';
import { createConnection } from 'typeorm';
import createError from 'http-errors';
// import api_routes from './v1';
import { logger_middleware } from './v1/middlewares/logger';
import { NextFunction, Response, Request } from 'express';
import { Supplier } from 'v1/entities/Supplier';


const port = process.env.SERVER_PORT;

const app = express();

// setup ORM
createConnection({
  type: 'postgres',
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASS,
  logging: true,
  synchronize: true, // translate entities to sql logic for table creation
  entities: [
    Supplier
  ]
}).then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));

// setup view engine
app.use(logger_middleware);
// use express types (make sure this is defined in front of the routes!)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(api_routes);

if (!port) {
  console.log("port unspecified.");
  process.exit(1);
}

// start webserver
app.listen(port, () => {
  console.log(`serving on port ${ port }`);
});

app.use((_req:Request, _res:Response, next:NextFunction) => {
  // forward 404 error
  next(createError(404));
});
