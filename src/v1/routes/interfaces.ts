export enum HTTPRequests {
  get="get",
  post="post",
  put="put",
  delete="delete"
}

export enum Queries {
  all="all",
  one="one",
  save="save",
  update="update",
  remove="remove",
}

export interface Route {
  method: HTTPRequests;
  path: string;
  controller: any;
  action: Queries;
  validation: any[];
}