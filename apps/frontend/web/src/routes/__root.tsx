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
import { getWorkoutBuilds } from '../services/workoutsService';


export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [opened, { toggle }] = useDisclosure();

  const setExercises = useStore((state) => state.setExercises);
  const loading = useAuthStore((state) => state.loading);
  const supabaseSession = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Start Workout', to: '/startWorkout' },
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
        const workoutBuilds = await getWorkoutBuilds(supabaseSession.access_token);
        console.log('workoutBuilds', workoutBuilds)
        setExercises(exercises);
      }
    };
    asyncFetchData();
  }, [supabaseSession, setExercises]);

  if (loading) {
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
