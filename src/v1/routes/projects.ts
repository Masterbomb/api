import { body, param, ValidationChain } from "express-validator";
import { ProjectController } from "../controllers/projects";
import { Route, Queries, HTTPRequests } from "./interfaces";

// validation definitions
const pkValidation: ValidationChain[] = [
  param('id').isInt({min: 0})
];

const postValidation: ValidationChain[] = [
  body('name').isString(),
  body('description').isString(),
];

// route definitions
export const projectRoutes: Route[] = [
  {
    method: HTTPRequests.get,
    path: "/projects",
    controller: ProjectController,
    action: Queries.all,
    validation: [],
  },
  {
    method: HTTPRequests.get,
    path: "/projects/:id",
    controller: ProjectController,
    action: Queries.one,
    validation: pkValidation
  },
  {
    method: HTTPRequests.post,
    path: "/projects",
    controller: ProjectController,
    action: Queries.save,
    validation: postValidation,
  },
  {
    method: HTTPRequests.put,
    path: "/projects/:id",
    controller: ProjectController,
    action: Queries.update,
    validation: [...pkValidation,...postValidation ],
  },
  {
    method: HTTPRequests.delete,
    path: "/projects/:id",
    controller: ProjectController,
    action: Queries.remove,
    validation: pkValidation,
  }
];