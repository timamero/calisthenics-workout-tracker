import { Stack, Box } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutData from './WorkoutData';
import WorkoutOverlays from './WorkoutOverlays';
import { TextInputWithEdit } from '../common/TextInputWithEdit';

export default function WorkoutDraft() {
  const mode = useWorkoutDraftStore((state) => state.mode);
  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle,
  );
  return (
    <Box flex="1" w="100%" p="md">
      <Stack gap="xl" align="center">
        <TextInputWithEdit
          initialValue={workoutTitle!}
          onSave={setWorkoutTitle}
          hideEdit={mode === 'log' ? true : false}
          variant={'title'}
          maxLength={70}
          titleOrder={1}
          titleSize="h1"
        />
        <Stack gap="xl" align="center" w="100%">
          <WorkoutData />
        </Stack>
        <WorkoutOverlays />
      </Stack>
    </Box>
  );
}
