import { useEffect } from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppShell, Burger, Loader, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from '@mantine/core';
import { supabase } from '../services/supabaseClient';

import { useSupabaseAuth } from '@cwt/hooks/useSupabaseAuth';
import { useAuthStore } from '@cwt/state/auth';
import { useStore } from '@cwt/state/store';

import { getExercises } from '../services/exercisesService';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const mode = useStore((state) => state.mode);
  const isWorkoutSavePending = useStore((state) => state.isWorkoutSavePending);
  const setExercises = useStore((state) => state.setExercises);

  const loading = useAuthStore((state) => state.loading);
  const supabaseSession = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);
  // console.log('Session:', supabaseSession);
  // Manage state to open and close menu
  const [opened, { toggle }] = useDisclosure();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Workout', to: '/workoutDashboard' },
    { label: 'Library', to: '/library' },
    { label: 'Past Workouts', to: '/history' },
    { label: 'Profile', to: '/user' },
    { label: 'Settings', to: '/settings' },
  ];

  useSupabaseAuth(supabase, setSession, setLoading);

  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token) {
        const exercises = await getExercises(supabaseSession.access_token);
        setExercises(exercises);
      }
    };
    asyncFetchData();
  }, [supabaseSession, setExercises]);

  if (loading || isWorkoutSavePending) {
    return (
      <Stack h="100vh" w="100vw" display="flex" justify="center" align="center">
        <Loader color="blue" />
      </Stack>
    );
  }

  if (!supabaseSession) {
    return (
      <div>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  }

  // TODO: Update implementation of hiding navigation during workout
  if (mode) {
    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          // collapsed: { mobile: !opened },
          collapsed: { mobile: true, desktop: true },
        }}
        padding="md"
      >
        <AppShell.Header>
          <div>Logo</div>
        </AppShell.Header>
        <AppShell.Main>
          <Outlet />
          <TanStackRouterDevtools />
        </AppShell.Main>
      </AppShell>
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
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            label={link.label}
            component={Link}
            to={link.to}
            onClick={() => opened && toggle()}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
        <TanStackRouterDevtools />
      </AppShell.Main>
    </AppShell>
  );
}
