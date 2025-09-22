import { Stack, Text, Group, Button } from '@mantine/core';

import FieldsList from './FieldsList';

interface SetProps {
  setIndex: number;
  showDeleteButton: boolean;
  onDeleteSetClick: () => void;
}

export default function Set({
  setIndex,
  showDeleteButton,
  onDeleteSetClick,
}: SetProps) {
  return (
    <Stack bg="gray.1">
      <Group>
        <Text>{`Set ${setIndex + 1}`}</Text>
        {showDeleteButton && (
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
