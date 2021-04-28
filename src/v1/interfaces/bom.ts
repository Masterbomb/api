import { Request } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';

// define query type for bom as Query
export type BomQuery = {
    project_id: number;
    part_id?: number;
} & Query;

// expect type BomQuery from request.query
export interface BomRequest extends Request {
    query: BomQuery;
}
