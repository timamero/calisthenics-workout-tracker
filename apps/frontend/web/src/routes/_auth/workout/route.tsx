import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppShell, Button } from '@mantine/core';

import { useWorkoutContextWeb } from '@cwt/hooks';

export const Route = createFileRoute('/_auth/workout')({
  component: RouteComponent,
});

function RouteComponent() {
  const cancelOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.cancelOverlayHandler;

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
      <AppShell.Header style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="outline"
          color="gray"
          ml={16}
          onClick={() => cancelOverlayHandler!.open()}
        >
          Cancel
        </Button>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
