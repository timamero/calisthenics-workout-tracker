import { useEffect } from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppShell, Burger, Loader, Stack } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { useSupabaseAuth } from '@cwt/hooks';
import { NavLink } from '@mantine/core';
import {
  useWorkoutDraftStore,
  useAuthStore,
  useLeveragesAssistsStore,
  useExerciseLibraryStore,
} from '@cwt/state/stores';
// import { useExerciseLibraryStore } from '@cwt/state/stores';

import { supabase } from '../services/supabaseClient';
import { getExercises } from '../services/exercisesService';
import { getLeveragesAssists } from '../services/leveragesAssistsService';
import OverlayContextProvider from '../providers/OverlayContextProvider';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const mode = useWorkoutDraftStore((state) => state.mode);
  const isWorkoutSavePending = useWorkoutDraftStore(
    (state) => state.isWorkoutSavePending,
  );
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );

  const loading = useAuthStore((state) => state.loading);
  const supabaseSession = useAuthStore((state) => state.session);

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

  useSupabaseAuth(supabase);

  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token) {
        const exercises = await getExercises(supabaseSession.access_token);
        setExercises(exercises);

        const leveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        setLeveragesAssists(leveragesAssists);
      }
    };
    asyncFetchData();
  }, [supabaseSession, setExercises, setLeveragesAssists]);

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
      <OverlayContextProvider>
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
      </OverlayContextProvider>
    );
  }

  return (
    <OverlayContextProvider>
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
    </OverlayContextProvider>
  );
}
