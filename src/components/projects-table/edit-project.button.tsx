import { FC } from 'react';
import { useDialogContext } from '@/hooks/dialog/useDialogContext.ts';
import { Button } from '@/components/ui/button.tsx';
import { Edit } from 'lucide-react';

interface IEditProjectButtonProps {
  id: string;
}

export const EditProjectButton: FC<IEditProjectButtonProps> = ({ id }) => {
  const { openDialog } = useDialogContext();

  return <Button
    variant="ghost"
    onClick={() => openDialog(id)}
  >
    <Edit />
  </Button>;
};
