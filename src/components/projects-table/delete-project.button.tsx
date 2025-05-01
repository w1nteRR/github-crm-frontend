import { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/api/auth/projects.api.ts';
import { Button } from '@/components/ui/button.tsx';
import { Trash } from 'lucide-react';

interface IDeleteProjectButtonProps {
  id: string;
}

export const DeleteProjectButton: FC<IDeleteProjectButtonProps> = ({ id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => projectsApi.deleteProject(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  return (
    <Button
      variant='ghost'
      color='red'
      onClick={() => mutation.mutate(id)}
      disabled={mutation.isPending}
    >
      <Trash /> Delete
    </Button>
  );
};
