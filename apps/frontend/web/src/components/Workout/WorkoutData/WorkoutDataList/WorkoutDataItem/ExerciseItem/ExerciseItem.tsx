import { Stack, Text, Button, Group } from '@mantine/core';
// import { LuSquareArrowUp, LuSquareArrowDown } from 'react-icons/lu';

import type { Mode } from '@cwt/schema/workouts';
import SetList from './SetList';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';

interface ExerciseItemProps {
  mode: Mode;
  name: string;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleAddSetClick: () => void;
  handleDeleteExerciseClick: () => void;
}

export default function ExerciseItem({
  mode,
  name,
  handleUpClick,
  handleDownClick,
  handleAddSetClick,
  handleDeleteExerciseClick,
}: ExerciseItemProps) {
  return (
    <Group align="flex-start">
      <ReorderButtonGroup
        handleUpClick={() => handleUpClick()}
        handleDownClick={() => handleDownClick()}
      />
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
