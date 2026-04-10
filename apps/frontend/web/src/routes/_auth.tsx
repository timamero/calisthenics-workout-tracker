import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

import { useAuthStore } from '@cwt/state/stores';
import { WorkoutContextProvider } from '@cwt/context';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <WorkoutContextProvider appType="web">
      <Outlet />
    </WorkoutContextProvider>
  );
}
