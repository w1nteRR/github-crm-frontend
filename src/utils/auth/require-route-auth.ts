import { redirect } from 'react-router';
import { RoutesPaths } from '@/navigation/routes.enum.ts';

export async function requireAuth(): Promise<boolean> {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    throw redirect(RoutesPaths.SignIn);
  }

  return true;
}

async function checkAuth(): Promise<boolean> {
  const token = localStorage.getItem('token');
  return Boolean(token);
}
