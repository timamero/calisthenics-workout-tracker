import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';

export const Route = createFileRoute('/_auth/dashboard')({
  // beforeLoad: ({ location }) => {
  //   const user = useAuthStore.getState().user;
  //   if (user) {
  //     throw redirect({
  //       to: '/login',
  //       search: {
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
  component: DashboardView,
});

export function DashboardView() {
  return (
    <Stack align="center" justify="center" h="100vh">
      <Stack align="center">
        <Title order={1} size={64}>
          This is an authenticated view
        </Title>
        <Outlet />
      </Stack>
    </Stack>
  );
}
