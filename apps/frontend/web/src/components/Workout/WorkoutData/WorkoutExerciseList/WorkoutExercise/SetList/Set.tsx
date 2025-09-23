import { Stack, Text, Group, Button, Checkbox } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

import FieldsList from './FieldsList';

interface SetProps {
  mode: Mode;
  setIndex: number;
  isCompleted: boolean;
  showDeleteButton: boolean;
  handleToggleCompleted: (value: boolean) => void;
  onDeleteSetClick: () => void;
}

export default function Set({
  mode,
  setIndex,
  isCompleted,
  showDeleteButton,
  handleToggleCompleted,
  onDeleteSetClick,
}: SetProps) {
  return (
    <Stack bg="gray.1">
      <Group>
        <Text>{`Set ${setIndex + 1}`}</Text>
        {showDeleteButton && (mode === 'build' || mode === 'edit') && (
          <Button
            color="red"
            variant="white"
            onClick={() => onDeleteSetClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      <FieldsList />
      <Checkbox
        checked={isCompleted}
        onChange={(event) => handleToggleCompleted(event.currentTarget.checked)}
      />
    </Stack>
  );
}
