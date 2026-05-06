import { Stack, Button } from '@mantine/core';

import { useWorkoutContextWeb } from '@cwt/hooks';

import WorkoutData from './WorkoutData';
import { WorkoutTitleContainer as WorkoutTitle } from './WorkoutTitle';
import WorkoutOverlays from './WorkoutOverlays';

export default function WorkoutDraft() {
  const saveOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.saveOverlayHandler;

  return (
    <Stack gap="xl" align="center">
      <WorkoutTitle />
      <Stack gap="xl" align="center">
        <WorkoutData />
        <Stack justify="center">
          <Button
            variant="filled"
            color="orange"
            onClick={() => saveOverlayHandler!.open()}
          >
            Save Workout
          </Button>
        </Stack>
      </Stack>
      <WorkoutOverlays />
    </Stack>
  );
}
