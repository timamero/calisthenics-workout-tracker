import { Outlet, useLocation } from '@tanstack/react-router';
import {
  AppShell,
  Button,
  Stack,
  SegmentedControl,
  Center,
} from '@mantine/core';
import { IoCreateOutline, IoPlayOutline } from 'react-icons/io5';

import {
  useWorkoutDraftStore,
  useWorkoutStopwatchStore,
} from '@cwt/state/stores';
import { useWorkoutContextWeb } from '@cwt/hooks';

import AddWorkoutItemMenu from '../WorkoutDraft/AddWorkoutItemMenu';

export default function WorkoutLayout() {
  const location = useLocation();
  console.log('current path', location.pathname);
  const cancelOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.cancelOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const startTimer = useWorkoutStopwatchStore((state) => state.start);
  const stopTimer = useWorkoutStopwatchStore((state) => state.stop);
  const setMode = useWorkoutDraftStore((state) => state.setMode);

  const handleSetMode = () => {
    if (mode === 'edit') {
      setMode('log');
      startTimer();
    } else if (mode === 'log') {
      setMode('edit');
      stopTimer();
    }
  };

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
        height: 160,
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
        <Stack h="100%" justify="center" align="center">
          <AddWorkoutItemMenu />
          {mode !== 'build' && (
            <SegmentedControl
              value={mode as 'edit' | 'log'}
              onChange={() => handleSetMode()}
              color="lime.2"
              data={[
                {
                  value: 'edit',
                  label: (
                    <Center style={{ gap: 10 }}>
                      <IoCreateOutline size={16} />
                      <span>Edit</span>
                    </Center>
                  ),
                },
                {
                  value: 'log',
                  label: (
                    <Center style={{ gap: 10 }}>
                      <IoPlayOutline size={16} />
                      <span>Log</span>
                    </Center>
                  ),
                },
              ]}
            />
          )}
        </Stack>
      </AppShell.Footer>
    </AppShell>
  );
}
