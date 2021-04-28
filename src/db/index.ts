import dotenv from "dotenv";
import pgPromise from "pg-promise";

export interface IPostgres{
    database:string;
    host:string;
    port:number;
    user:string;
    db: pgPromise.IDatabase<any,any>;
    get_db: () => pgPromise.IDatabase<any,any>;
}

export class Postgres implements IPostgres {

    // class attributes
    database:string;
    host:string;
    port:number;
    user:string;
    db: pgPromise.IDatabase<any,any>;

    constructor(database:string, host:string, port:string, user:string) {
        this.database = database;
        this.host = host;
        this.port = parseInt( port, 10);
        this.user = user;
        // this.db = this.connect_db()
    }

    connect_db():void {
        // rename pgp
        const pgp = pgPromise();
        // configure postgres with types that pgp accepts
        const config = {
            database: this.database,
            host: this.host,
            port: this.port,
            user: this.user
        } as Parameters<typeof pgp>[0];
        this.db = pgp(config);
    }

    get_db(): pgPromise.IDatabase<any,any>{
        return this.db;
    }
}

dotenv.config();

// need to validate the types on the process.env vars
if (process.env.PGDATABASE === undefined ||
    process.env.PGHOST === undefined ||
    process.env.PGPORT === undefined ||
    process.env.PGUSER === undefined) {
    throw new Error("Database configuration fields invalid. Please check the .env file in root");
} else {
    console.log("Database environment passed validation")
}

export const postgres = new Postgres(process.env.PGDATABASE, process.env.PGHOST, process.env.PGPORT, process.env.PGUSER);
