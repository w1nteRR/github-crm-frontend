import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { router } from '@/navigation/routes.tsx';
import { AuthProvider } from '@/providers/auth.provider.tsx';
import { DialogProvider } from '@/providers/dialog.provider.tsx';

import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DialogProvider>
          <RouterProvider router={router} />
        </DialogProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
