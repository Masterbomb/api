import { body, param, ValidationChain } from "express-validator";
import { ManufacturerController } from "../controllers/manufacturers";
import { Route, Queries, HTTPRequests } from "./interfaces";


// validation definitions
const pkValidation: ValidationChain[] = [
  param('id').isInt({min:0})
];

const postValidation: ValidationChain[] = [
  body('name').isString()
];

// route definitions
export const manufacturerRoutes: Route[] = [
  {
    method: HTTPRequests.get,
    path: "/manufacturers",
    controller: ManufacturerController,
    action: Queries.all,
    validation: [],
  },
  {
    method: HTTPRequests.get,
    path: "/manufacturers/:id",
    controller: ManufacturerController,
    action: Queries.one,
    validation: pkValidation
  },
  {
    method: HTTPRequests.post,
    path: "/manufacturers",
    controller: ManufacturerController,
    action: Queries.save,
    validation: postValidation,
  },
  {
    method: HTTPRequests.put,
    path: "/manufacturers/:id",
    controller: ManufacturerController,
    action: Queries.update,
    validation: [...pkValidation, ...postValidation]
  },
  {
    method: HTTPRequests.delete,
    path: "/manufacturers/:id",
    controller: ManufacturerController,
    action: Queries.remove,
    validation: pkValidation,
  }
];