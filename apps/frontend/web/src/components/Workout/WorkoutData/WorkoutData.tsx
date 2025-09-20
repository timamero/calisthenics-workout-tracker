import { Stack, Text } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutExercise from './WorkoutExercise';
import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';

export default function WorkoutData() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);

  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).exercises.length;

  if (!workoutData) {
    return <Text>Loading</Text>;
  }

  const workoutExercises = workoutData.exercises.map((ex, i) => {
    return (
      <WorkoutExercise key={ex.id} workoutExercise={ex} exerciseIndex={i} />
    );
  });
  return (
    <Stack gap="xl" align="center">
      {workoutExercisesLength === 0 && <EmptyWorkoutPlaceholder />}
      {workoutExercises}
    </Stack>
  );
}
