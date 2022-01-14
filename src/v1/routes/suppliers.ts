
import { body, param } from "express-validator";
import { SupplierController } from "../controllers/supplier";
import { Route, Queries, HTTPRequests } from "./interfaces";


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
    validation: [
      param('id').isInt(),
    ]
  },
  {
    method: HTTPRequests.post,
    path: "/suppliers",
    controller: SupplierController,
    action: Queries.save,
    validation: [
      body('name').isString(),
      body('website').isString(),
    ],
  },
  {
    method: HTTPRequests.delete,
    path: "/suppliers/:id",
    controller: SupplierController,
    action: Queries.remove,
    validation: [
      param('id').isInt(),
    ],
  }
];