export interface BaseProject {
  name: string;
  description: string;
}

export interface Project extends BaseProject {
  id: number;
}