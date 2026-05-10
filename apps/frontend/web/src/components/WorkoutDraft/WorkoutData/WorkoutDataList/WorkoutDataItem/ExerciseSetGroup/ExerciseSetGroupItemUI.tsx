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
    <Stack
      w="100%"
      maw={600}
      align="center"
      style={{ borderBottom: '1px solid var(--mantine-color-dark-1)' }}
    >
      <Text size="lg" fw={600} my="xs">
        Set {setNumber}
      </Text>
      <Stack
        // bd="1px solid var(--mantine-color-default-border)"
        px="lg"
        // w={300}
        bg="transparent"
        bdrs="lg"
        w="100%"
      >
        {children}
      </Stack>
    </Stack>
  );
}
