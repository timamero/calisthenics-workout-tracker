import { Stack, Text, Button, Group } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';
import SetList from './SetList';

interface ExerciseItemProps {
  mode: Mode;
  name: string;
  handleAddSetClick: () => void;
  handleDeleteExerciseClick: () => void;
}

export default function ExerciseItem({
  mode,
  name,
  handleAddSetClick,
  handleDeleteExerciseClick,
}: ExerciseItemProps) {
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>{name}</Text>
        {mode !== 'log' && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteExerciseClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      <SetList />
      {mode !== 'log' && (
        <Button
          variant="outline"
          color="dark"
          onClick={() => handleAddSetClick()}
        >
          Add Set
        </Button>
      )}
    </Stack>
  );
}
