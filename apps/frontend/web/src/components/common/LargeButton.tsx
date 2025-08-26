import { Paper, Stack, UnstyledButton } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import classes from './LargeButton.module.css';

interface LargeButtonProps {
  to: string;
  children: ReactNode;
}

export default function LargeButton({ to, children }: LargeButtonProps) {
  const handleClick = () => {
    console.log('clicked item');
  };
  return (
    <UnstyledButton
      onClick={handleClick}
      className={classes.button}
      component={Link}
      to={to}
    >
      <Paper p="md" radius="sm" bg="none">
        <Stack align="center" justify="center" gap="sm">
          {children}
        </Stack>
      </Paper>
    </UnstyledButton>
  );
}
