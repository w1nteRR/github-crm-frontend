import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@/navigation/layouts/main.layout.tsx';
import { AuthLayout } from '@/navigation/layouts/auth.layout.tsx';

import SignIn from '@/navigation/routes/auth/sign-in.tsx';
import Home from '@/navigation/routes/home.tsx';
import SignUp from '@/navigation/routes/auth/sign-up.tsx';

import { requireAuth, requireGuest } from '@/utils/auth/require-route-auth.ts';

export const router = createBrowserRouter([
  {
    path: 'auth',
    Component: AuthLayout,
    loader: requireGuest,
    children: [
      {
        path: 'sign-in',
        Component: SignIn
      },
      {
        path: 'sign-up',
        Component: SignUp
      }
    ]
  },
  {
    Component: MainLayout,
    children: [
      {
        path: '/',
        Component: Home,
        loader: requireAuth
      }
    ]
  }
]);
