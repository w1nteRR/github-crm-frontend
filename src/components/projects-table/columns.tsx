import { ColumnDef } from '@tanstack/react-table';
import { IProject } from '@/types/projects/project.types.ts';
import { DeleteProjectButton } from '@/components/projects-table/delete-project.button.tsx';
import { EditProjectButton } from '@/components/projects-table/edit-project.button.tsx';

export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'owner',
    header: 'Owner'
  },
  {
    accessorKey: 'stars',
    header: 'Stars'
  },
  {
    accessorKey: 'forks',
    header: 'Forks'
  },
  {
    accessorKey: 'issues',
    header: 'Open Issues'
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: info => new Date(info.getValue<number>() * 1000).toLocaleString()
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <>
          <EditProjectButton id={id} />
          <DeleteProjectButton id={id} />
        </>
      );
    }
  }
];
