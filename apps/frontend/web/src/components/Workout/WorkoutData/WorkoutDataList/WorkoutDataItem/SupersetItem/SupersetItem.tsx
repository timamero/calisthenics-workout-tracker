import { Stack, Group, Text, Button } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

interface SupersetItemProps {
  mode: Mode;
  handleDeleteSectionClick: () => void;
}

export default function SupersetItem({
  mode,
  handleDeleteSectionClick,
}: SupersetItemProps) {
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>Section</Text>
        {mode !== 'log' && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteSectionClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      <Text>Exercises and Supersets placeholder</Text>
    </Stack>
  );
}
