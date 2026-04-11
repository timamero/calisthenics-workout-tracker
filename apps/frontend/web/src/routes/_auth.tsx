import { useEffect } from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';

import { useAuthStore } from '@cwt/state/stores';

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
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (!user) {
      navigate({
        to: '/login',
      });
    }
  }, [user, navigate]);
  return <Outlet />;
}
