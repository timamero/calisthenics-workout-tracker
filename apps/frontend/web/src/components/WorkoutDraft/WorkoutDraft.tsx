import { Stack } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutData from './WorkoutData';
import WorkoutOverlays from './WorkoutOverlays';
import { TextInputWithEdit } from '../common/TextInputWithEdit';

export default function WorkoutDraft() {
  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle,
  );
  return (
    <Stack gap="xl" align="center">
      <TextInputWithEdit
        initialValue={workoutTitle!}
        onSave={setWorkoutTitle}
      />
      <Stack gap="xl" align="center">
        <WorkoutData />
      </Stack>
      <WorkoutOverlays />
    </Stack>
  );
}
