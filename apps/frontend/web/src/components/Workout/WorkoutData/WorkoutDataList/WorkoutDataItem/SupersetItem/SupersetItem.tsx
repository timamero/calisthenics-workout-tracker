import { Stack, Group, Text, Button } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';

interface SupersetItemProps {
  mode: Mode;
  handleDeleteSupersetClick: () => void;
}

export default function SupersetItem({
  mode,
  handleDeleteSupersetClick,
}: SupersetItemProps) {
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>Superset</Text>
        {mode !== 'log' && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteSupersetClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      <Text>Exercises placeholder</Text>
    </Stack>
  );
}
