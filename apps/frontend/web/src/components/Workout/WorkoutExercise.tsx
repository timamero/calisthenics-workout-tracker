import { Stack, Text } from '@mantine/core';

import { useStore } from '@cwt/state/store';
import type { WorkoutExercise } from '@cwt/schema/workouts';

interface WorkoutExerciseProps {
  workoutExercise: WorkoutExercise;
}

export default function WorkoutExercise({
  workoutExercise,
}: WorkoutExerciseProps) {
  const getExerciseNameById = useStore((state) => state.getExerciseNameByID);
  const name = getExerciseNameById(workoutExercise.exercise_id);
  return (
    <Stack>
      <Text>{name}</Text>
    </Stack>
  );
}
