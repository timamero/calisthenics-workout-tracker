import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';

export const Route = createFileRoute('/_auth/app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack align="center" justify="center">
      <Stack align="center">
        <Title order={1} size={64}>
          This is an authenticated app layout
        </Title>
        <Outlet />
      </Stack>
    </Stack>
  );
}
