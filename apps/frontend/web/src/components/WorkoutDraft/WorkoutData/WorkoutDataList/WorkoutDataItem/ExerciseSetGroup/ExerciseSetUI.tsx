import type { ReactNode } from 'react';

import { Stack, Text } from '@mantine/core';

interface ExerciseSetUIProps {
  exerciseName: string;
  children: ReactNode;
}

export default function ExerciseSetUI({
  exerciseName,
  children,
}: ExerciseSetUIProps) {
  return (
    <Stack align="center">
      <Text size="md" fw={700}>
        {exerciseName}
      </Text>
      {children}
    </Stack>
  );
}
