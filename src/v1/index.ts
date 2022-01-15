import { routes } from "./routes";

routes.forEach(route => {
  route.path = '/v1' + route.path;
});

export default routes;