import { createContext, useState, ReactNode } from 'react';

type DialogState = {
  open: boolean;
  payload?: unknown;
};

type DialogContextType = {
  open: boolean;
  payload?: unknown;
  openDialog: (payload?: unknown) => void;
  closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextType>({} as DialogContextType);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState>({ open: false });

  const openDialog = (payload?: unknown) => setDialog({ open: true, payload });
  const closeDialog = () => setDialog({ open: false });

  return (
    <DialogContext.Provider
      value={{
        open: dialog.open,
        payload: dialog.payload,
        openDialog,
        closeDialog
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
