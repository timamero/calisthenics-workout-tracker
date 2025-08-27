import { Stack, Text } from '@mantine/core';

import { useStore } from '@cwt/state/store';

export default function Workout() {
  const workout = useStore((state) => state.workout);

  const EmptyWorkoutPlaceholder = () => {
    if (workout!.workout_data.exercises.length === 0) {
      return (
        <Stack align="center" bd="2px dashed gray.6" w="max-content" p="lg">
          <Text size="lg" fw={800}>
            Ready to start building your workout?
          </Text>
          <Text c="gray.8">Add your first exercise to begin</Text>
        </Stack>
      );
    }
  };
  return (
    <Stack gap="xl" align="center">
      <EmptyWorkoutPlaceholder />
    </Stack>
  );
}
