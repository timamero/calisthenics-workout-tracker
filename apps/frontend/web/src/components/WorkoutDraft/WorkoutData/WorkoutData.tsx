import { Stack, Text } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Mode } from '@cwt/schema/workouts';

import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';
import WorkoutDataList from './WorkoutDataList';

export default function WorkoutData() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  // console.log('workoutData:::', JSON.stringify(workoutData));
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;

  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).length;

  // if (mode === 'read') {
  //   return <Text>Workout Log Read Mode</Text>;
  // }

  if (!workoutData) {
    return <Text>Loading</Text>;
  }

  return (
    <Stack gap="xl" align="center">
      {workoutExercisesLength === 0 && <EmptyWorkoutPlaceholder mode={mode} />}
      <WorkoutDataList />
    </Stack>
  );
}
