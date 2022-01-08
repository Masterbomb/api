import { supplierRoutes } from "./suppliers";
import { manufacturerRoutes } from "./manufacturers";
import { Route } from "./interfaces";
import { partRoutes } from "./parts";
import { projectRoutes } from "./projects";
import { bomRoutes } from "./boms";

export const routes: Route[] = supplierRoutes.concat(
  manufacturerRoutes,
  partRoutes,
  projectRoutes,
  bomRoutes
);