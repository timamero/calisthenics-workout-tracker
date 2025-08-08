import { useEffect } from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from '@mantine/core';
import { supabase } from '../services/supabaseClient';
import type { Subscription } from '@supabase/auth-js';

import { useAuthStore } from '@cwt/state/auth';
import { useStore } from '@cwt/state/store';

import { asyncGetExercises } from '../services/exercisesService';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [opened, { toggle }] = useDisclosure();

  const setExercises = useStore((state) => state.setExercises);

  const supabaseSession = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession) {
        const exercises = await asyncGetExercises(supabaseSession.access_token);
        if (exercises) {
          setExercises(exercises);
        }
      }
    };
    asyncFetchData();
  }, [supabaseSession, setExercises]);

  useEffect(() => {
    let authListener: {
      unsubscribe: () => void;
      subscription: Subscription;
    } | null = null;

    const setupAuth = async () => {
      console.log(
        'Setting up Supabase authentication listener and initial session check...',
      );
      // setLoading(true);

      // Get the initial session from Supabase's storage
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();
        setSession(initialSession);
        console.log(
          'Initial session retrieved:',
          initialSession ? 'present' : 'null',
        );
      } catch (error) {
        console.error('Error getting initial session:', error);
        setSession(null); // Ensure session is null on error
      }

      // Set up the real-time auth state listener
      const { data } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          console.log(
            'Auth event:',
            event,
            'Current Session:',
            currentSession ? 'present' : 'null',
          );

          switch (event) {
            case 'SIGNED_IN':
            case 'USER_UPDATED':
              setSession(currentSession);
              console.log('User signed in or updated, session set.');
              break;
            case 'SIGNED_OUT':
              setSession(null);
              console.log('User signed out, session cleared.');
              break;
            case 'PASSWORD_RECOVERY':
              console.log('Password recovery initiated.');
              // You might want to navigate to a password reset screen here
              break;
            case 'INITIAL_SESSION':
              // This event fires after getSession() if a session exists.
              // It's often redundant if you've already called getSession()
              // but good to log for debugging.
              console.log('Initial session event received.');
              setSession(currentSession);
              break;
            default:
              // Handle other events if necessary
              console.log(`Unhandled auth event: ${event}`);
              break;
          }
          // setLoading(false);
        },
      );
      authListener = {
        subscription: data.subscription,
        unsubscribe: () => data.subscription.unsubscribe(),
      }; // Assign the listener object to the variable for cleanup

      // Ensure loading is set to false after initial check and listener setup
      // This handles cases where no auth event fires immediately but initial session is known.
      // setLoading(false);
    };

    setupAuth();

    return () => {
      if (authListener) {
        authListener.unsubscribe();
        console.log('Supabase auth listener unsubscribed.');
      }
    };
  }, [setSession]);

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
