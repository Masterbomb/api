import { supplierRoutes } from "./suppliers";
import { manufacturerRoutes } from "./manufacturers";
import { Route } from "./interfaces";
import { partRoutes } from "./parts";
import { projectRoutes } from "./projects";

export const routes: Route[] = supplierRoutes.concat(
  manufacturerRoutes,
  partRoutes,
  projectRoutes
);