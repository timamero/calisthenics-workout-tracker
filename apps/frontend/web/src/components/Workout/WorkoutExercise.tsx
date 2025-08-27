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

  const sets = workoutExercise.sets.map((set, i) => {
    const fields = workoutExercise.tracked.map((field) => {
      if (field === 'reps') {
        return <RepField value={set.fields.reps!} />;
      }
      if (field === 'duration') {
        return <TimeField />;
      }
      return <></>;
    });
    return (
      <Stack>
        <Text>{`Set ${i + 1}`}</Text>
        {fields}
      </Stack>
    );
  });
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Text>{name}</Text>
      {sets}
    </Stack>
  );
}
