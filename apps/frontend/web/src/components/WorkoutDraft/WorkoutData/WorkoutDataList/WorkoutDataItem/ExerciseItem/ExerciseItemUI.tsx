import { Stack, Text, Button, Group } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';
import SetList from '../SetList';
import ReorderButtonGroup from '../../../../../common/ReorderButtonGroup';

interface ExerciseItemUIProps {
  mode: Mode;
  name: string;
  isFirst: boolean;
  isLast: boolean;
  handleUpClick: () => void;
  handleDownClick: () => void;
  handleAddSetClick: () => void;
  handleDeleteExerciseClick: () => void;
}

export default function ExerciseItemUI({
  mode,
  name,
  isFirst,
  isLast,
  handleUpClick,
  handleDownClick,
  handleAddSetClick,
  handleDeleteExerciseClick,
}: ExerciseItemUIProps) {
  return (
    <Group align="flex-start">
      {(mode === 'edit' || mode === 'build') && (
        <ReorderButtonGroup
          handleUpClick={() => handleUpClick()}
          handleDownClick={() => handleDownClick()}
          isFirst={isFirst}
          isLast={isLast}
        />
      )}
      <Stack
        bd="1px solid var(--mantine-color-default-border)"
        p="lg"
        w={300}
        bg="transparent"
        bdrs="lg"
      >
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
        <Stack gap="xs">
          <SetList />
        </Stack>
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
