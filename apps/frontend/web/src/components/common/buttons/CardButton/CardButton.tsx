import { Paper, UnstyledButton } from '@mantine/core';
import type { ReactNode } from 'react';

import classes from './CardButton.module.css';

interface CardButtonProps {
  handleClick?: () => void;
  children: ReactNode;
}

export default function CardButton({
  handleClick = () => console.log('clicked item'),
  children,
}: CardButtonProps) {
  return (
    <UnstyledButton onClick={handleClick}>
      <Paper
        className={classes.button}
        p="lg"
        radius="lg"
        miw={300}
        maw={620}
        h="100%"
        mah="max-content"
        mx="auto"
        withBorder
      >
        {children}
      </Paper>
    </UnstyledButton>
  );
}
