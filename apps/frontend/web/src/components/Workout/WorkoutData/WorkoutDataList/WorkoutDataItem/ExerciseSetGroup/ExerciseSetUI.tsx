import type { ReactNode } from 'react';

import { Stack, Text, Divider } from '@mantine/core';

interface ExerciseSetUIProps {
  exerciseName: string;
  isLast: boolean;
  children: ReactNode;
}

export default function ExerciseSetUI({
  exerciseName,
  isLast,
  children,
}: ExerciseSetUIProps) {
  return (
    <Stack align="center">
      <Text fz={{ base: 'sm', md: 'md' }} fw={700}>
        {exerciseName}
      </Text>
      {children}
      {!isLast && (
        <Stack w="100%" align="center">
          <Stack w="100%" maw={360}>
            <Divider color="gray.3" />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
