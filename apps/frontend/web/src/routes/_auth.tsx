import { useEffect } from 'react';
import { Title, Stack } from '@mantine/core';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';

import {
  useAuthStore,
  useExerciseLibraryStore,
  useLeveragesAssistsStore,
} from '@cwt/state/stores';
import { type ExerciseResponse } from '@cwt/schema/exercises';
import { type LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';

import { getExercises } from '../services/exercisesService';
import { getLeveragesAssists } from '../services/leveragesAssistsService';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  },
  loader: async () => {
    let leveragesAssists: LeveragesAssistsResponse[] | null = null;
    let exercises: ExerciseResponse[] | null = null;

    const leveragesAssistsState =
      useLeveragesAssistsStore.getState().leveragesAssists;
    if (leveragesAssistsState) {
      leveragesAssists = leveragesAssistsState;
    }
    const displayedExercises =
      useExerciseLibraryStore.getState().displayedExercises;
    if (exercises) {
      exercises = displayedExercises;
    }

    if (exercises && leveragesAssists) {
      return { exercises, leveragesAssists };
    }

    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      if (!leveragesAssists) {
        console.time('fetching LeveragesAssists');
        const fetchedLeveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        console.timeEnd('fetching LeveragesAssists');
        leveragesAssists = fetchedLeveragesAssists;
      }
      if (!exercises) {
        console.time('fetch exercises in auth');
        const fetchedExercises = await getExercises(
          supabaseSession.access_token,
        );
        console.timeEnd('fetch exercises in auth');
        exercises = fetchedExercises;
      }
      return { exercises, leveragesAssists };
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const data: {
    exercises: ExerciseResponse[];
    leveragesAssists: LeveragesAssistsResponse[];
  } = Route.useLoaderData();

  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  const loading = useExerciseLibraryStore((state) => state.loading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  useEffect(() => {
    if (!user) {
      navigate({
        to: '/login',
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('_auth :: useEffect called');
    console.log('_auth :: setting data and loading');
    setLeveragesAssists(data.leveragesAssists);
    setExercises(data.exercises);
    setLoading(false);
  }, [data.exercises, setExercises, setLoading]);

  if (!isExercisesSet || loading) {
    console.log('displaying exercises loading');
    return (
      <Stack>
        <Title size="h6">Loading</Title>
      </Stack>
    );
  }
  return <Outlet />;
}
