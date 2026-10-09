import { Outlet, useLocation } from '@tanstack/react-router';
import { AppShell, Button, Stack, Group } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutContextWeb } from '@cwt/hooks';

import AddWorkoutItemMenu from '../Workout/AddWorkoutItemMenu';

export default function WorkoutLayout() {
  const location = useLocation();

  const cancelOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.cancelOverlayHandler;
  const saveOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.saveOverlayHandler;

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
        height: {
          base: mode === 'log' ? 60 : 120,
          md: mode === 'log' ? 80 : 160,
        },
        collapsed: true,
      }}
      padding="0"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md" bg="gray.0">
          <Button
            variant="outline"
            size="md"
            radius="md"
            // onClick={() => cancelOverlayHandler!.open()}
            onClick={() => console.log('clicked Cancel')}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            size="md"
            radius="md"
            // onClick={() => saveOverlayHandler!.open()}
            onClick={() => console.log('clicked Save')}
          >
            Save
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main style={{ display: 'flex' }}>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <Stack h="100%" justify="center" align="center" gap="sm" bg="gray.0">
          {mode !== 'log' && <AddWorkoutItemMenu />}
        </Stack>
      </AppShell.Footer>
    </AppShell>
  );
}
