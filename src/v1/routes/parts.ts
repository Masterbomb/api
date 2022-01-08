import { body, param, CustomValidator } from "express-validator";
import { PartController } from "../controllers/parts";
import { Route, Queries, HTTPRequests } from "./interfaces";
import { getRepository } from "typeorm";
import { Supplier } from "../entities/supplier";
import { Manufacturer } from "../entities/manufacturer";


const isValidSupplier: CustomValidator = async (id:number) => {
  // check for non-inclusive supplier
  if (!id) return;
  await getRepository(Supplier).findOne(id).then(user => {
    if (!user) {
      return Promise.reject('Supplier does not exist');
    }
    return Promise.resolve('Supplier exists');
  });
};

const isValidManufacturer: CustomValidator = async (id:number) => {
  // check for non-inclusive supplier
  if (!id) return;
  await getRepository(Manufacturer).findOne(id).then(user => {
    if (!user) {
      return Promise.reject('Manufacturer does not exist');
    }
    return Promise.resolve('Manufacturer exists');
  });
};

export const partRoutes: Route[] = [
  {
    method: HTTPRequests.get,
    path: "/parts",
    controller: PartController,
    action: Queries.all,
    validation: [],
  },
  {
    method: HTTPRequests.get,
    path: "/parts/:id",
    controller: PartController,
    action: Queries.one,
    validation: [
      param('id').isInt(),
    ]
  },
  {
    method: HTTPRequests.post,
    path: "/parts",
    controller: PartController,
    action: Queries.save,
    validation: [
      body('name').isString(),
      body('manufacturer').custom(isValidManufacturer),
      body('supplier').custom(isValidSupplier),
      body('unit_price').isNumeric(),
    ],
  },
  {
    method: HTTPRequests.delete,
    path: "/parts/:id",
    controller: PartController,
    action: Queries.remove,
    validation: [
      param('id').isInt(),
    ],
  }
];