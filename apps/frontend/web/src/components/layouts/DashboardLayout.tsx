import { Outlet, Link, linkOptions } from '@tanstack/react-router';

import { AppShell, Burger, NavLink, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LogoButton from './LogoButton';

export default function DashBoardLayout() {
  const [opened, { toggle }] = useDisclosure();

  const navLinks = [
    linkOptions({ label: 'Home', to: '/dashboard/home' }),
    linkOptions({ label: 'Exercises', to: '/dashboard/library' }),
    linkOptions({ label: 'Logs', to: '/dashboard/history' }),
    // linkOptions({ label: 'Profile', to: '/dashboard/user' }), // temporarily disabled until v0.1.0-alpha.2
    linkOptions({ label: 'Settings', to: '/dashboard/settings' }),
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={0}
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md">
          <LogoButton linkTo="/dashboard/home" />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {navLinks.map((link) => {
          return (
            <NavLink
              key={link.to}
              label={link.label}
              component={Link}
              to={link.to}
              onClick={() => opened && toggle()}
            />
          );
        })}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
