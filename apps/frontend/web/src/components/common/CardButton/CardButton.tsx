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
        p="md"
        radius="lg"
        miw={300}
        maw={460}
        h="100%"
        mah={230}
        mx="auto"
        withBorder
      >
        {children}
      </Paper>
    </UnstyledButton>
  );
}
