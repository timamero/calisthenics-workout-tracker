import { Outlet, useLocation } from '@tanstack/react-router';
import { AppShell, Button } from '@mantine/core';

import { useWorkoutContextWeb } from '@cwt/hooks';

export default function WorkoutLayout() {
  const location = useLocation();
  console.log('current path', location.pathname);
  const cancelOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.cancelOverlayHandler;

  return (
    <AppShell
      header={{
        height: 60,
        collapsed: location.pathname === '/workout' ? false : true,
      }}
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
