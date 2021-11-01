import { ParamsDictionary } from 'express-serve-static-core';

// basic parameter type
export type ReqParam = {
    id: number;
} & ParamsDictionary;

// define regex type guard only allowing positive ints
export default (params:ParamsDictionary): params is ReqParam => {
    return /^\d+$/.test(params.id);
};
