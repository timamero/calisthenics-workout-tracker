import { Stack, Text } from '@mantine/core';

import { useStore } from '@cwt/state/store';
import type { WorkoutExercise } from '@cwt/schema/workouts';

// import RepField from './RepField';
// import TimeField from './TimeField';
import Sets from './Sets';

interface WorkoutExerciseProps {
  workoutExercise: WorkoutExercise;
}

export default function WorkoutExercise({
  workoutExercise,
}: WorkoutExerciseProps) {
  const getExerciseNameById = useStore((state) => state.getExerciseNameByID);
  const name = getExerciseNameById(workoutExercise.exercise_id);

  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Text>{name}</Text>
      <Sets tracked={workoutExercise.tracked} sets={workoutExercise.sets} />
    </Stack>
  );
}
