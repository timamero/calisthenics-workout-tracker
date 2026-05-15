import { Link } from '@tanstack/react-router';
import { Image, Text, UnstyledButton, Group, Box } from '@mantine/core';

import Logo from '../../assets/logo-min-opt-160x160.svg';
import classes from './LogoButton.module.css';

export default function LogoButton({ linkTo }: { linkTo: string }) {
  return (
    <UnstyledButton component={Link} to={linkTo} className={classes.logoButton}>
      <Group gap={8}>
        <Box className={classes.logoButtonIconWrapper} p="xs" bdrs={32}>
          <Image
            // radius="md"
            w={16}
            style={{ aspectRatio: 0.92 }}
            src={Logo}
          />
        </Box>
        <Text
          className={classes.logoButtonText}
          ff="heading"
          fw="bolder"
          size="lg"
        >
          Torque
        </Text>
      </Group>
    </UnstyledButton>
  );
}
