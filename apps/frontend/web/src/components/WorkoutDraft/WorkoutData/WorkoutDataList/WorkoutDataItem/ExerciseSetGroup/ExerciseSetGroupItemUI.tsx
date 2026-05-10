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
      style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
    >
      <Text size="lg" fw={600} my="xs">
        Set {setNumber}
      </Text>
      <Stack
        // bd="1px solid var(--mantine-color-default-border)"
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
