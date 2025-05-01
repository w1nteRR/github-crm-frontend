import { Outlet } from 'react-router';

export const MainLayout = () => {
  return <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className='w-full'>
      <Outlet />
    </div>
  </main>;
};
