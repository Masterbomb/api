import { body, param } from "express-validator";
import { ProjectController } from "../controllers/projects";
import { Route, Queries, HTTPRequests } from "./interfaces";


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
    validation: [
      param('id').isInt(),
    ]
  },
  {
    method: HTTPRequests.post,
    path: "/projects",
    controller: ProjectController,
    action: Queries.save,
    validation: [
      body('name').isString(),
      body('revision').isString(),
      body('description').isString(),
    ],
  },
  {
    method: HTTPRequests.delete,
    path: "/projects/:id",
    controller: ProjectController,
    action: Queries.remove,
    validation: [
      param('id').isInt(),
    ],
  }
];