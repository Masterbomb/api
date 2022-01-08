import { getRepository } from "typeorm";
import { body, param, CustomValidator} from "express-validator";
import { ProjectController } from "../controllers/projects";
import { Route, Queries, HTTPRequests } from "./interfaces";
import { Project } from "../entities/project";
import { Part } from "../entities/part";

const isValidProject: CustomValidator = async (id:number) => {
  await getRepository(Project).findOne(id).then(project => {
    if (!project) {
      return Promise.reject('Project does not exist');
    }
    return Promise.resolve('Project exists');
  });
};

const isValidPart: CustomValidator = async (id:number) => {
  await getRepository(Part).findOne(id).then(part => {
    if (!part) {
      return Promise.reject('Part does not exist');
    }
    return Promise.resolve('Part exists');
  });
};


export const projectRoutes: Route[] = [
  {
    method: HTTPRequests.get,
    path: "/boms",
    controller: ProjectController,
    action: Queries.all,
    validation: [],
  },
  {
    method: HTTPRequests.post,
    path: "/boms",
    controller: ProjectController,
    action: Queries.save,
    validation: [
      body('project').custom(isValidProject),
      body('part').custom(isValidPart),
      body('quantity').isInt({min: 1}),
      body('revision').isString(),
    ],
  },
  {
    method: HTTPRequests.delete,
    path: "/boms/:id",
    controller: ProjectController,
    action: Queries.remove,
    validation: [
      param('id').isInt({min: 0}),
    ],
  }
];