import { supplierRoutes } from "./suppliers";
import { manufacturerRoutes } from "./manufacturers";
import { Route } from "./interfaces";

export const routes: Route[] = supplierRoutes.concat(manufacturerRoutes);