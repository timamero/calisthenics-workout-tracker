import { useEffect } from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from '@mantine/core';

import { useAuthStore } from '@cwt/state/auth';
// import { user } from '@cwt/auth/user';
import { session } from '@cwt/auth/session';
import { supabase } from '../supabaseClient';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [opened, { toggle }] = useDisclosure();

  const supabaseSession = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  const loading = useAuthStore((state) => state.loading);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const initAuth = async () => {
      const currentSession = await session(supabase);

      setSession(currentSession);
      // setLoading(false);
    };

    if (!supabaseSession) {
      console.log('No session found, initializing...');
      initAuth();
    }
  }, [supabaseSession, setSession]);

  if (!supabaseSession) {
    return (
      <div>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  }
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Home" component={Link} to="/" onClick={toggle} />
        {/* <NavLink label="About" component={Link} to="/about" onClick={toggle} /> */}
        <NavLink
          label="Start Workout"
          component={Link}
          to="/startWorkout"
          onClick={toggle}
        />
        <NavLink
          label="Library"
          component={Link}
          to="/library"
          onClick={toggle}
        />
        <NavLink
          label="Past Workouts"
          component={Link}
          to="/history"
          onClick={toggle}
        />
        <NavLink label="Profile" component={Link} to="/user" onClick={toggle} />
        <NavLink
          label="Settings"
          component={Link}
          to="/settings"
          onClick={toggle}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
        <TanStackRouterDevtools />
      </AppShell.Main>
    </AppShell>
  );
}
