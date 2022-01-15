import { supplierRoutes } from "./suppliers";
import { manufacturerRoutes } from "./manufacturers";
import { Route } from "./interfaces";
import { partRoutes } from "./parts";

export const routes: Route[] = supplierRoutes.concat(
  manufacturerRoutes,
  partRoutes
);