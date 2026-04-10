import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell } from '@mantine/core';

export const Route = createFileRoute('/_auth/workout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: true, desktop: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div>Logo</div>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
