import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IAdProjectInput } from '@/utils/validation/schemas/projects/add-project.schema.ts';
import { useProjects } from '@/hooks/projects/useProjects.ts';

export const AddProjectForm = () => {
  const { register, handleSubmit } = useForm<IAdProjectInput>();
  const { add: addNewProject } = useProjects();

  const onSubmit: SubmitHandler<IAdProjectInput> = async (data) => {
    await addNewProject(data.name);
  };

  return (
    <form className='flex flex-row gap-3' onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} placeholder='facebook/react' id='email' type='text' className='w-full' required />
      <Button>Add</Button>
    </form>
  );
};
