import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Button, Group } from '@mantine/core';

import { useStore } from '@cwt/state/store';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  const mode = useStore((state) => state.mode);
  console.log('mode set to: ', mode);

  return (
    <Stack gap="xl">
      <Title size="h6">Build Workout</Title>
      <Group justify="center">
        <Button variant="subtle" color="gray">
          Cancel workout building
        </Button>
      </Group>
    </Stack>
  );
}
