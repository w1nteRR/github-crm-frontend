import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/projects-table/data-table.tsx';
import { columns } from '@/components/projects-table/columns.tsx';
import { AddProjectForm } from '@/components/projects/add-project.form.tsx';
import { projectsApi } from '@/api/auth/projects.api.ts';
import { EditProjectFormDialog } from '@/components/projects/edit-project-form.dialog.tsx';
import { useDialogContext } from '@/hooks/dialog/useDialogContext.ts';

export default function Home () {
  const { open } = useDialogContext();
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: projectsApi.getProjects });

  return (
    <>
      <div className='w-full max-w-xs mb-6'>
        <AddProjectForm />
      </div>
      <DataTable columns={columns} data={projectsQuery.data?.list || []} />
      {projectsQuery.isFetching && <p className='my-1 text-xs'>Fetching projects...</p>}

      {open &&  <EditProjectFormDialog />}
    </>
  );
}
