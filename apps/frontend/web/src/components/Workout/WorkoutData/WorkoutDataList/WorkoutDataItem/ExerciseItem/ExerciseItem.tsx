import { Stack, Text, Button, Group } from '@mantine/core';
import { LuSquareArrowUp, LuSquareArrowDown } from 'react-icons/lu';

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
    <Group align="flex-start">
      <Button.Group orientation="vertical">
        <Button variant="transparent" p={1} my={2}>
          <LuSquareArrowUp size={24} />
        </Button>
        <Button variant="transparent" p={1} my={2}>
          <LuSquareArrowDown size={24} />
        </Button>
      </Button.Group>
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
    </Group>
  );
}
