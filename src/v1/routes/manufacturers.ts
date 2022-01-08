import { body, param } from "express-validator";
import { ManufacturerController } from "../controllers/manufacturers";
import { Route, Queries, HTTPRequests } from "./interfaces";


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
    validation: [
      param('id').isInt({min:0})
    ]
  },
  {
    method: HTTPRequests.post,
    path: "/manufacturers",
    controller: ManufacturerController,
    action: Queries.save,
    validation: [
      body('name').isString()
    ],
  },
  {
    method: HTTPRequests.put,
    path: "/manufacturers/:id",
    controller: ManufacturerController,
    action: Queries.update,
    validation: [
      param('id').isInt({min:0})
    ]
  },
  {
    method: HTTPRequests.delete,
    path: "/manufacturers/:id",
    controller: ManufacturerController,
    action: Queries.remove,
    validation: [
      param('id').isInt({min:0}),
    ],
  }
];