import { body, param, ValidationChain } from "express-validator";
import { SupplierController } from "../controllers/suppliers";
import { Route, Queries, HTTPRequests } from "./interfaces";

const pkValidation: ValidationChain[] = [
  param('id').isInt({min: 0})
];

const postValidation: ValidationChain[] = [
  body('name').isString(),
  body('website').isString()
];

export const supplierRoutes: Route[] = [
  {
    method: HTTPRequests.get,
    path: "/suppliers",
    controller: SupplierController,
    action: Queries.all,
    validation: [],
  },
  {
    method: HTTPRequests.get,
    path: "/suppliers/:id",
    controller: SupplierController,
    action: Queries.one,
    validation: pkValidation
  },
  {
    method: HTTPRequests.post,
    path: "/suppliers",
    controller: SupplierController,
    action: Queries.save,
    validation: postValidation,
  },
  {
    method: HTTPRequests.put,
    path: "suppliers/:id",
    controller: SupplierController,
    action: Queries.update,
    validation: [...pkValidation, ...postValidation]
  },
  {
    method: HTTPRequests.delete,
    path: "/suppliers/:id",
    controller: SupplierController,
    action: Queries.remove,
    validation: pkValidation,
  }
];