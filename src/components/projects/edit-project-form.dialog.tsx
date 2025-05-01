import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useDialogContext } from '@/hooks/dialog/useDialogContext.ts';
import { useQueryClient } from '@tanstack/react-query';
import { IProject, ProjectList } from '@/types/projects/project.types.ts';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useProjects } from '@/hooks/projects/useProjects.ts';

export const EditProjectFormDialog = () => {
  const queryClient = useQueryClient();

  const { open, closeDialog, payload } = useDialogContext();
  const { update } = useProjects();

  const projectsData = queryClient.getQueryData<{ list: ProjectList }>(['projects']);
  const project = projectsData?.list.find((p) => p.id === payload);

  const { register, handleSubmit, formState: { defaultValues } } = useForm<IProject>({
    defaultValues: project
  });

  const onSubmit: SubmitHandler<IProject> = async (data: IProject) => {
    console.log('data', data);
    await update(data);
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={open => !open ? closeDialog() : undefined}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{defaultValues?.owner}/{defaultValues?.name}</DialogTitle>
          <DialogDescription>
            Make changes to project here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Owner
            </Label>
            <Input {...register('owner')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input {...register('name')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Url
            </Label>
            <Input {...register('url')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Stars
            </Label>
            <Input {...register('stars', { valueAsNumber: true })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Forks
            </Label>
            <Input {...register('forks', { valueAsNumber: true })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Issues
            </Label>
            <Input {...register('issues', { valueAsNumber: true })} className="col-span-3" />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
