import { Stack, Text, Group, Button } from '@mantine/core';

import type { WorkoutExercise } from '@cwt/schema/workouts';

import RepField from './RepField';
import TimeField from './TimeField';
import RestField from './RestField';

export default function Sets({
  tracked,
  sets,
}: Pick<WorkoutExercise, 'sets' | 'tracked'>) {
  const workoutSets = sets.map((set, i) => {
    const fields = tracked.map((field) => {
      if (field === 'reps') {
        return (
          <Stack key={field}>
            <RepField value={set.fields.reps!} />
            <RestField />
          </Stack>
        );
      }
      if (field === 'duration') {
        return (
          <Stack key={field}>
            <TimeField />
            <RestField />
          </Stack>
        );
      }
      return <></>;
    });
    return (
      <Stack key={i} bg="gray.1">
        <Group>
          <Text>{`Set ${i + 1}`}</Text>
          <Button
            color="red"
            variant="white"
            onClick={() => console.log(`delete set ${i + 1}`)} // TODO: implement delete set
          >
            Delete
          </Button>
        </Group>
        {fields}
      </Stack>
    );
  });
  return <Stack>{workoutSets}</Stack>;
}
