export interface IProject {
  id: string;
  name: string;
  owner: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  created_at: number;
  user_id: string;
}

export type ProjectList = IProject[];

export type ProjectListResponse = {
  list: ProjectList;
};
