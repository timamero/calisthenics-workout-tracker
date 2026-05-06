import { Stack } from '@mantine/core';

import WorkoutData from './WorkoutData';
import { WorkoutTitleContainer as WorkoutTitle } from './WorkoutTitle';
import WorkoutOverlays from './WorkoutOverlays';

export default function WorkoutDraft() {
  return (
    <Stack gap="xl" align="center">
      <WorkoutTitle />
      <Stack gap="xl" align="center">
        <WorkoutData />
      </Stack>
      <WorkoutOverlays />
    </Stack>
  );
}
