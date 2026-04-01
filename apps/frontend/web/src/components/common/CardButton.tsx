import { Paper, Stack, UnstyledButton } from '@mantine/core';
import type { ReactNode } from 'react';

interface CardButtonProps {
  handleClick?: () => void;
  children: ReactNode;
}

export default function CardButton({
  handleClick = () => console.log('clicked item'),
  children,
}: CardButtonProps) {
  // const handleClick = () => {
  //   console.log('clicked item');
  // };
  return (
    <UnstyledButton onClick={handleClick}>
      <Paper
        shadow="xs"
        p="md"
        radius="lg"
        miw={160}
        h="100%"
        mih={160}
        withBorder
      >
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
