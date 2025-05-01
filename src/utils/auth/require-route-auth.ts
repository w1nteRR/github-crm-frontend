import { redirect } from 'react-router';
import { RoutesPaths } from '@/navigation/routes.enum.ts';

export async function requireAuth(): Promise<boolean> {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    throw redirect(RoutesPaths.SignIn);
  }

  return true;
}

export async function requireGuest(): Promise<void>{
  const isAuthenticated = await checkAuth();

  if (isAuthenticated) {
    throw redirect(RoutesPaths.Home);
  }
}

async function checkAuth(): Promise<boolean> {
  const token = localStorage.getItem('access_token');
  return Boolean(token);
}
