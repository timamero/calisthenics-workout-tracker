import { Stack, Text } from '@mantine/core';

import { useStore } from '@cwt/state/store';
import type { WorkoutExercise } from '@cwt/schema/workouts';

import RepField from './RepField';
import TimeField from './TimeField';

interface WorkoutExerciseProps {
  workoutExercise: WorkoutExercise;
}

export default function WorkoutExercise({
  workoutExercise,
}: WorkoutExerciseProps) {
  const getExerciseNameById = useStore((state) => state.getExerciseNameByID);
  const name = getExerciseNameById(workoutExercise.exercise_id);

  const fields = workoutExercise.tracked.map((field) => {
    if (field === 'reps') {
      return <RepField />;
    }
    if (field === 'duration') {
      return <TimeField />;
    }
    return <></>;
  });
  return (
    <Stack>
      <Text>{name}</Text>
      {fields}
    </Stack>
  );
}
