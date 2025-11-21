import { Stack, Text } from '@mantine/core';

import { emptyWorkoutPlaceholderContent } from '@cwt/content';
import type { Mode } from '@cwt/schema/workouts';

export default function EmptyWorkoutPlaceholder({ mode }: { mode: Mode }) {
  return (
    <Stack align="center" bd="2px dashed gray.6" p="lg">
      <Text size="lg" fw={800}>
        {emptyWorkoutPlaceholderContent(mode).heading}
      </Text>
      <Text c="gray.8">{emptyWorkoutPlaceholderContent(mode).message}</Text>
    </Stack>
  );
}
