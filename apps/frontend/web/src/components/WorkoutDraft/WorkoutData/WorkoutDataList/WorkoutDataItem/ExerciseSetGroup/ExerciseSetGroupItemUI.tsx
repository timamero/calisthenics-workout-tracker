import type { ReactNode } from 'react';

import { Stack, Text } from '@mantine/core';

interface ExerciseSetGroupItemUIProps {
  setNumber: number;
  children: ReactNode;
}

export default function ExerciseSetGroupItemUI({
  setNumber,
  children,
}: ExerciseSetGroupItemUIProps) {
  return (
    <Stack w="100%" maw={400}>
      <Text size="xs" fw={600}>
        Set {setNumber}
      </Text>
      <Stack
        bd="1px solid var(--mantine-color-default-border)"
        p="lg"
        w={300}
        bg="transparent"
        bdrs="lg"
      >
        {children}
      </Stack>
    </Stack>
  );
}
