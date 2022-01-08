import { getRepository } from "typeorm";
import { body, param, CustomValidator} from "express-validator";
import { BomController } from "../controllers/boms";
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


export const bomRoutes: Route[] = [
  {
    method: HTTPRequests.get,
    path: "/boms",
    controller: BomController,
    action: Queries.all,
    validation: [],
  },
  {
    method: HTTPRequests.post,
    path: "/boms",
    controller: BomController,
    action: Queries.save,
    validation: [
      body('project').isInt({min: 0}).custom(isValidProject),
      body('part').isInt({min: 0}).custom(isValidPart),
      body('quantity').isInt({min: 0}),
      body('revision').isString(),
    ],
  },
  {
    method: HTTPRequests.delete,
    path: "/boms/:id",
    controller: BomController,
    action: Queries.remove,
    validation: [
      param('id').isInt({min: 0}),
    ],
  }
];