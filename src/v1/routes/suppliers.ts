import { body, param } from "express-validator";
import { SupplierController } from "../controller/supplier";
import { Route, Queries, HTTPRequests } from "./interfaces";

export const supplierRoutes: Route[] = [
  {
    method: HTTPRequests.get,
    route: "/suppliers",
    controller: SupplierController,
    action: Queries.all,
    validation: [],
  },
  {
    method: HTTPRequests.get,
    route: "/suppliers/:id",
    controller: SupplierController,
    action: Queries.one,
    validation: [
      param('id').isInt(),
    ],
  },
  {
    method: HTTPRequests.post,
    route: "/suppliers",
    controller: SupplierController,
    action: Queries.save,
    validation: [
      body('firstName').isString(),
      body('lastName').isString(),
      body('age').isInt({ min: 0 }).withMessage('age must be a positive integer'),
    ],
  },
  {
    method: HTTPRequests.delete,
    route: "/suppliers/:id",
    controller: SupplierController,
    action: Queries.remove,
    validation: [
      param('id').isInt(),
    ],
  }
];