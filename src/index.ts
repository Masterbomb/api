import app from './app';
import { port } from './config';
import { createConnection } from 'typeorm';
import { Supplier } from './v1/entities/supplier';
import { Manufacturer } from './v1/entities/manufacturer';
import { Part } from './v1/entities/part';

// setup ORM
createConnection({
  type: 'postgres',
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASS,
  logging: true,
  synchronize: true, // translate entities to sql logic for table creation
  entities: [
    Supplier,
    Manufacturer,
    Part
  ]
}).then(_connection => {
  // start webserver
  app.listen(port, () => {
    console.log(`serving on port ${ port }`);
  });
  // here you can start to work with your entities
}).catch(error => console.log(error));

