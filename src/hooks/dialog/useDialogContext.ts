import { useContext } from 'react';
import { DialogContext } from '@/providers/dialog.provider.tsx';

export const useDialogContext = () => useContext(DialogContext);
