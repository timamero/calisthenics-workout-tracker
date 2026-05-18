import type { ReactNode } from 'react';

import { Group, Stack, Text } from '@mantine/core';

interface ExerciseSetGroupItemUIProps {
  totalSets: number | null;
  setNumber: number;
  children: ReactNode;
}

export default function ExerciseSetGroupItemUI({
  totalSets,
  setNumber,
  children,
}: ExerciseSetGroupItemUIProps) {
  return (
    <Stack
      w="100%"
      // maw={600}
      align="center"
      px="lg"
      pb="sm"
      style={{
        borderBottom: `${setNumber === totalSets ? '0' : '1'}px solid var(--mantine-color-violet-2)`,
      }}
    >
      <Group w="100%" justify="space-between" maw={360}>
        <Text
          ff="heading"
          fz={{ base: 'lg', md: 'xl' }}
          fw={800}
          my="xs"
          px="lg"
        >
          Set {setNumber}
        </Text>
      </Group>
      <Stack
        // bd="1px solid var(--mantine-color-default-border)"
        // px="lg"
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
