import { Outlet, useLocation } from '@tanstack/react-router';
import { AppShell, Button } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutContextWeb } from '@cwt/hooks';

import AddWorkoutItemMenu from '../WorkoutDraft/AddWorkoutItemMenu';

export default function WorkoutLayout() {
  const location = useLocation();
  console.log('current path', location.pathname);
  const cancelOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.cancelOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);

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
      footer={{
        height: 100,
        collapsed:
          mode === 'log' || location.pathname === '/workout' ? false : true,
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
      <AppShell.Footer>
        <AddWorkoutItemMenu />
      </AppShell.Footer>
    </AppShell>
  );
}
