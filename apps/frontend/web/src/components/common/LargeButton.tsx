import { Paper, Stack, UnstyledButton } from '@mantine/core';
import type { ReactNode } from 'react';

interface LargeButtonProps {
  children: ReactNode
}

export default function LargeButton({ children }: LargeButtonProps) {
  const handleClick = () => {
    console.log('clicked item');
  };
  return (
    <UnstyledButton onClick={handleClick}>
      {/* <Paper shadow="xs" p="md" radius="sm" miw={160} h={160} withBorder> */}
      <Paper p="md" radius="sm" withBorder>
        <Stack
          bg="var(--mantine-color-body)"
          align="center"
          justify="center"
          gap="sm"
        >
          {children}
        </Stack>
      </Paper>
    </UnstyledButton>
  );
}
