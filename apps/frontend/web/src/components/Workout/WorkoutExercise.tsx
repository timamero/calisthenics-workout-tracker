import { Stack, Text } from '@mantine/core';
import type { WorkoutExercise } from '@cwt/schema/workouts';

interface WorkoutExerciseProps {
  workoutExercise: WorkoutExercise;
}

export default function WorkoutExercise({
  workoutExercise,
}: WorkoutExerciseProps) {
  return (
    <Stack>
      <Text>{workoutExercise.exercise_id}</Text>
    </Stack>
  );
}
