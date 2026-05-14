import { Link, Outlet } from '@tanstack/react-router';
import {
  AppShell,
  Image,
  Text,
  UnstyledButton,
  Group,
  Box,
} from '@mantine/core';

import Logo from '../../assets/logo-min-opt-160x160.svg';
import classes from './SiteLayout.module.css';

export default function SiteLayout() {
  // const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      // navbar={{
      //   width: 300,
      //   breakpoint: 'sm',
      //   collapsed: { mobile: !opened },
      // }}
    >
      <AppShell.Header>
        {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}

        {/* <div>Logo</div> */}
        <Group h="100%" px="xl">
          <UnstyledButton
            component={Link}
            to="/"
            className={classes.logoButton}
          >
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
                size="xl"
              >
                Torque
              </Text>
            </Group>
          </UnstyledButton>
        </Group>
      </AppShell.Header>

      {/* <AppShell.Navbar>Navbar</AppShell.Navbar> */}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
