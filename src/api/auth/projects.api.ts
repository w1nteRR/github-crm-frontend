import { api } from '@/api/axios.ts';
import { User } from '@/types/user/user.types.ts';
import { IProject, ProjectListResponse } from '@/types/projects/project.types.ts';

export const projectsApi = {
  async addProject(name: string): Promise<User> {
    const res = await api.post<User>('/project', { project_name: name });
    return res.data;
  },

  async getProjects(): Promise<ProjectListResponse> {
    const res = await api.get<ProjectListResponse>('/project/list');
    return res.data;
  },

  async deleteProject(id: string): Promise<void> {
    const res = await api.delete('/project', { data: { project_id: id } });
    return res.data;
  },

  async updateProject(project: IProject): Promise<void> {
    const res = await api.patch('/project', { project });
    return res.data;
  }
};
