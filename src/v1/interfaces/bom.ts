import { Request } from 'express-serve-static-core';
import { Query } from 'express-serve-static-core';

// define query type for bom as Query
export type BomQuery = {
    projectId: number;
    partId?: number;
} & Query;

// expect type BomQuery from request.query
export interface BomRequest extends Request {
    query: BomQuery;
}
