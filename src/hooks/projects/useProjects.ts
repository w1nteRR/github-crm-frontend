import { projectsApi } from '@/api/auth/projects.api.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IProject } from '@/types/projects/project.types.ts';

export const useProjects = () => {
  const queryClient = useQueryClient();

  const addProjectMutation = useMutation({
    mutationFn: (name: string) => projectsApi.addProject(name),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: (project: IProject) => projectsApi.updateProject(project),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const add = async (name: string) => {
    try {
      addProjectMutation.mutate(name);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (project: IProject) => {
    try {
      updateProjectMutation.mutate(project);
    } catch (error) {
      console.log(error);
    }
  };
  return { add, update };
};
