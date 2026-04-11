import {
  createFileRoute,
  Outlet,
  Link,
  linkOptions,
} from '@tanstack/react-router';

import { AppShell, Burger, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { WorkoutContextProvider } from '@cwt/context';

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const [opened, { toggle }] = useDisclosure();

  const navLinks = [
    linkOptions({ label: 'Home', to: '/dashboard/home' }),
    linkOptions({ label: 'Library', to: '/dashboard/library' }),
    linkOptions({ label: 'Past Workouts', to: '/dashboard/history' }),
    linkOptions({ label: 'Profile', to: '/dashboard/user' }),
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
      padding="md"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
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
      <AppShell.Main
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <WorkoutContextProvider appType="web">
          <Outlet />
        </WorkoutContextProvider>
      </AppShell.Main>
    </AppShell>
  );
}
