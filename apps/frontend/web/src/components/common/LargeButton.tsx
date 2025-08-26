import { Paper, Stack, UnstyledButton } from '@mantine/core';
import type { ReactNode } from 'react';

import classes from './LargeButton.module.css';

interface LargeButtonProps {
  children: ReactNode
}

export default function LargeButton({ children }: LargeButtonProps) {
  const handleClick = () => {
    console.log('clicked item');
  };
  return (
    <UnstyledButton onClick={handleClick} className={classes.button}>
      <Paper p="md" radius="sm" bg="none">
        <Stack
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
