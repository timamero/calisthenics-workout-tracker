import { Stack, Text, Group, Button, Checkbox } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

import FieldsList from './FieldsList';

interface SetProps {
  mode: Mode;
  setIndex: number;
  isCompleted: boolean;
  showDeleteButton: boolean;
  handleToggleCompleted: (value: boolean) => void;
  handleDeleteSetClick: () => void;
}

export default function Set({
  mode,
  setIndex,
  isCompleted,
  showDeleteButton,
  handleToggleCompleted,
  handleDeleteSetClick,
}: SetProps) {
  return (
    <Stack bg="gray.1">
      <Group>
        <Text>{`Set ${setIndex + 1}`}</Text>
        {showDeleteButton && (mode === 'build' || mode === 'edit') && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteSetClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      <FieldsList />
      {mode === 'log' && (
        <Checkbox
          checked={isCompleted}
          onChange={(event) =>
            handleToggleCompleted(event.currentTarget.checked)
          }
        />
      )}
    </Stack>
  );
}
