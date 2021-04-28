/**
 * bom.routes.ts
 *
 * API queries for /bom subroute
 *
 * @module bomRouter
 */

import { errors } from 'pg-promise';
import { Router, Request, Response } from 'express';
import { postgres } from '../../db';

const bomRouter = Router();
const table = "bom";

/** GET /v1/bom/?project_id=<Number> */
bomRouter.get('/', async (request:Request, response:Response):Promise<Response> => {
    try {
        const db = postgres.get_db();
        const bom = await db.any(`
            SELECT parts.name AS "Part Name",
            (SELECT name AS "Supplier" FROM suppliers WHERE id=parts.supplier_id),
            (SELECT name AS "Manufacturer" FROM manufacturers WHERE id=parts.manufacturer_id),
            ${table}.quantity AS "Quantity", ${table}.net_price AS "Net Price" FROM ${table} JOIN parts on ${table}.part_id=parts.id
            WHERE project_id=$[project_id]`,
            {...request.query}
        );
        response.status(200).json(bom);
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: err.message || err });
    }
    return response;
});

/** PUT /v1/bom/ */
bomRouter.put('/', async (request:Request, response:Response):Promise<Response> => {
    try {
        const db = postgres.get_db();
        const unitPrice = await db.one(`
            SELECT unit_price FROM parts WHERE id=$[part_id];`,
            {...request.body}
        );
        // FIX: not type safe!
        request.body.net_price = compute_net(request.body.quantity, unitPrice.unit_price);
        console.log({...request.body});
        await db.none(`
            UPDATE ${table}
            SET quantity = $[quantity], net_price = $[net_price]
            WHERE (project_id, part_id) = ($[project_id], $[part_id])`,
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

/** POST /v1/bom/ */
bomRouter.post('/', async (request:Request, response:Response):Promise<Response> => {
    const db = postgres.get_db();
    try{
        const unitPrice = await db.one(`
            SELECT unit_price FROM parts WHERE id=$[part_id];`,
            {...request.body}
        );
        // FIX: not type safe!
        request.body.net_price = compute_net(request.body.quantity, unitPrice.unit_price);
        console.log({...request.body});
        const id = await db.any(`
            INSERT INTO ${table}( project_id, part_id, quantity, net_price)
            VALUES( $[project_id], $[part_id], $[quantity], $[net_price] );`,
            {...request.body},
        );
        response.status(201).json(id);
    } catch (err) {
        console.error(err);
        if (err instanceof errors.QueryResultError) {
            response.status(404).json({error: 'Part not found'});
        } else {
            response.status(500).json({error: 'The server experienced an internal error'});
        }
    }
    return response;
});

function compute_net(quantity:string, unit_price:string):number {
    return parseInt(quantity,10) * parseFloat(unit_price);
}

export default bomRouter;