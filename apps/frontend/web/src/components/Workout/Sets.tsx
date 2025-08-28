import { Stack, Text } from '@mantine/core';

import type { WorkoutExercise } from '@cwt/schema/workouts';

import RepField from './RepField';
import TimeField from './TimeField';

export default function Sets({
  tracked,
  sets,
}: Pick<WorkoutExercise, 'sets' | 'tracked'>) {
  const workoutSets = sets.map((set, i) => {
    const fields = tracked.map((field) => {
      if (field === 'reps') {
        return <RepField key={field} value={set.fields.reps!} />;
      }
      if (field === 'duration') {
        return <TimeField key={field} />;
      }
      return <></>;
    });
    return (
      <Stack key={i} bg="gray.1">
        <Text>{`Set ${i + 1}`}</Text>
        {fields}
      </Stack>
    );
  });
  return <Stack>{workoutSets}</Stack>;
}
