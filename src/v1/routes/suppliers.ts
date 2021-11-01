/**
 * suppliers.ts
 *
 * API queries for /suppliers subroute
 *
 * @module suppliersRouter
 */

import { errors } from 'pg-promise';
import { Router, Request, Response} from 'express';
import { postgres } from '../../db';
import { pk_guard } from '../interfaces/params';

const suppliersRouter = Router();
const table = "suppliers";

/** GET /v1/suppliers/ */
suppliersRouter.get('/', (_request:Request, response:Response):void => {
    try {
        // get database passed by request object
        const db = postgres.get_db();
        const suppliers = db.any(`
            SELECT id, name, website FROM ${table}`
        );
        response.json(suppliers);
    } catch (err: Error) {
        console.error(err);
        response.status(500).json({ error: err.message});
    }
    return response.send();
});

/** GET /v1/suppliers/:id */
suppliersRouter.get('/:id', async (request:Request, response:Response):Promise<Response> => {
    // add manual validation of param
    if (pk_guard(request.params)) {
        const db = postgres.get_db();
        try {
            // using db.one as we expect to get at a single row to be returned
            const suppliers = await db.one(`
                SELECT id, name, website FROM ${table}
                WHERE id = $[id]`,
                { id: request.params.id }
            );
            response.json(suppliers);
        } catch (err) {
            console.error(err);
            // since the param is the pk more than one response row is not possible
            if (err instanceof errors.QueryResultError) {
                response.status(404).json({error: 'Supplier not found' });
            } else {
                response.status(500).json({ error: 'The server experienced an internal error' });
            }
        }
    } else {
        response.status(400).json({ error: 'Bad Request: id param must be an integer' });
    }
    return response;
});

/** POST /v1/suppliers/ */
suppliersRouter.post('/', async (request:Request, response:Response):Promise<Response> => {
    try {
        // get database passed by request object
        const db = postgres.get_db();
        const id = await db.one(`
            INSERT INTO ${table}( name, website )
            VALUES( $[name], $[website] )
            RETURNING id;`,
            {...request.body}
        );
        response.status(201).json({ id });
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: err.message || err });
    }
    return response;
});

/** PUT /v1/suppliers/ */
suppliersRouter.put('/', async (request:Request, response:Response):Promise<Response> => {
    try {
        const db = postgres.get_db();
        await db.none(`
            UPDATE ${table} SET name = $[name], website = $[website]
            WHERE id = $[id]`,
            { ...request.body }
        );
        // use .send() to send empty response body for 204
        response.status(204).send();
    } catch (err) {
        console.error(err);
        if (err instanceof errors.QueryResultError) {
            // not sure what status code to return here but it boils down to a bad request
            console.error("pg-promise rejected with " + err + "message: " + err.message);
            response.status(401).json({error: 'Bad Request' });
        } else {
            response.status(500).json({ error: 'The server experienced an internal error' });
        }
    }
    return response;
});

/** DELETE /v1/suppliers/:id */
suppliersRouter.delete('/:id', async (request:Request, response:Response):Promise<Response> => {
    if (pk_guard(request.params)) {
        try {
            // get database passed by request object
            const db = postgres.get_db();
            const id = await db.result(`
                DELETE FROM ${table}
                WHERE id = $[id]`,
                { id: request.params.id }, (r:any) => r.rowCount
            );
            response.json({ id });
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: err.message || err });
        }
    } else {
        response.status(400).json({ error: 'Bad Request: id param must be an integer' });
    }
    return response;
});

export default suppliersRouter;