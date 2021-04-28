/**
 * parts.ts
 *
 * API queries for /parts subroute
 *
 * @module partsRouter
 */

import { errors } from 'pg-promise';
import { Router, Request, Response } from 'express';
import { postgres } from '../../db';
import { pk_guard } from '../interfaces/params';

const partsRouter = Router();
const table = "parts";

/** GET /v1/parts/ */
partsRouter.get('/', async (_request:Request, response:Response):Promise<Response> => {
    try {
        const db = postgres.get_db();
        const parts = await db.any(`
            SELECT id, name, description, manufacturer_id, supplier_id, unit_price FROM ${table}`
        );
        response.json(parts);
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: err.message || err });
    }
    return response;
});

/** GET /v1/parts/:id */
partsRouter.get('/:id', async (request:Request, response:Response):Promise<Response> => {
    if (pk_guard(request.params)) {
        try {
            const db = postgres.get_db();
            const parts = await db.one(`
                SELECT id, name, description, manufacturer_id, supplier_id, unit_price FROM ${table}
                WHERE id = $[id]`,
                { id: request.params.id }
            );
            response.json(parts);
        } catch (err) {
            console.error(err);
            // since the param is the pk more than one response row is not possible
            if (err instanceof errors.QueryResultError) {
                response.status(404).json({error: 'Requested part not found' });
            } else {
                response.status(500).json({ error: 'The server experienced an internal error' });
            }
        }
    } else {
        response.status(400).json({ error: 'Bad Request: id param must be an integer' });
    }
    return response;
});

/** POST /v1/parts/ */
partsRouter.post('/', async (request:Request, response:Response):Promise<Response> => {
    try {
        const db = postgres.get_db();
        const id = await db.one(`
            INSERT INTO ${table}( name, description, manufacturer_id, supplier_id, unit_price )
            VALUES( $[name], $[description], $[manufacturer_id], $[supplier_id], $[unit_price] )
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

/** PUT /v1/parts/ */
partsRouter.put('/', async (request:Request, response:Response):Promise<Response> => {
    try {
        const db = postgres.get_db();
        await db.none(`
            UPDATE ${table}
            SET name = $[name], description = $[description], manufacturer_id = $[manufacturer_id],
            supplier_id = $[supplier_id], unit_price = $[unit_price]
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

/** DELETE /v1/parts/:id */
partsRouter.delete('/:id', async (request:Request, response:Response):Promise<Response> => {
    if (pk_guard(request.params)) {
        try {
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

export default partsRouter;