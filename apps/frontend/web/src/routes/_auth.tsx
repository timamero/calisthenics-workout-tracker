import { createFileRoute, redirect } from '@tanstack/react-router';
// import { Title, Stack, Text } from '@mantine/core';
import { useAuthStore } from '@cwt/state/stores';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    console.log('_auth || before load called');
    const user = useAuthStore.getState().user;
    console.log('_auth || user: ', user);
    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  },
  // component: AuthLayout,
});

// export function AuthLayout() {s
//   return <Outlet />;
// }
