import { Stack, Text, Group, Button } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

import FieldsList from './FieldsList';

interface SetProps {
  mode: Mode;
  setIndex: number;
  showDeleteButton: boolean;
  onDeleteSetClick: () => void;
}

export default function Set({
  mode,
  setIndex,
  showDeleteButton,
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
    </Stack>
  );
}
