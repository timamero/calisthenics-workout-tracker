import { Outlet, useLocation } from '@tanstack/react-router';
import { AppShell, Button, Stack, Group } from '@mantine/core';

import type { WorkoutLogResponse } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import {
  useWorkoutContextWeb,
  useWorkoutLogDetailContextWeb,
} from '@cwt/hooks';

import AddWorkoutItemMenu from '../Workout/AddWorkoutItemMenu';

export default function WorkoutUpdateLayout() {
  // --- State Management ---
  const mode = useWorkoutDraftStore((state) => state.mode);
  const initializeUpdatedWorkoutSave = useWorkoutDraftStore(
    (state) => state.initializeUpdatedWorkoutToSave,
  );
  const workoutLogDetail = useWorkoutLogDetailContextWeb()
    .workout as WorkoutLogResponse;

  // --- Hooks ---
  const location = useLocation();

  // --- Context ---
  const workoutOverlayHandlers = useWorkoutContextWeb().webOverlayHandlers;

  if (!workoutOverlayHandlers) {
    console.error('Error: useWorkoutContextWeb().webOverlayHandlers is null.');
    return null;
  }

  // --- Variables ---
  const cancelOverlayHandler =
    workoutOverlayHandlers.cancelUpdateLogOverlayHandler;
  const saveOverlayHandler = workoutOverlayHandlers.updateLogOverlayHandler;

  const handleSaveClick = () => {
    initializeUpdatedWorkoutSave(workoutLogDetail);
    saveOverlayHandler!.open();
  };

  return (
    <AppShell
      header={{
        height: 60,
        collapsed: location.pathname === '/update' ? false : true,
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
        collapsed:
          mode === 'log' || location.pathname === '/update' ? false : true,
      }}
      padding="0"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md" bg="gray.0">
          <Button
            variant="outline"
            size="md"
            radius="md"
            onClick={() => cancelOverlayHandler!.open()}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            size="md"
            radius="md"
            onClick={() => handleSaveClick()}
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
          <AddWorkoutItemMenu />
        </Stack>
      </AppShell.Footer>
    </AppShell>
  );
}
