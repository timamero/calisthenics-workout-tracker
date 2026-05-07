import { Stack, Text } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Mode } from '@cwt/schema/workouts';

import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';
import WorkoutDataList from './WorkoutDataList';

export default function WorkoutData() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;

  console.log('WorkoutData || workoutData = ', workoutData);

  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).length;

  if (!workoutData) {
    return <Text>Loading</Text>;
  }

  return (
    <Stack gap="xl" align="center" w="100%" miw={320}>
      {workoutExercisesLength === 0 && <EmptyWorkoutPlaceholder mode={mode} />}
      <WorkoutDataList />
    </Stack>
  );
}
