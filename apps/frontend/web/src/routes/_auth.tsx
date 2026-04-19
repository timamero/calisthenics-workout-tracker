import { useEffect } from 'react';
import { Title, Stack } from '@mantine/core';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';

import { useAuthStore, useExerciseLibraryStore } from '@cwt/state/stores';
import { type ExerciseResponse } from '@cwt/schema/exercises';

import { getExercises } from '../services/exercisesService';

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
    const displayedExercises =
      useExerciseLibraryStore.getState().displayedExercises;

    if (displayedExercises) {
      console.log('auth :: returning displayedExercises');
      return displayedExercises;
    }

    console.log('auth :: fetching exercises from database');
    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      console.time('fetch exercises in auth');
      const exercises = await getExercises(supabaseSession.access_token);
      console.timeEnd('fetch exercises in auth');
      return exercises;
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const exercises: ExerciseResponse[] = Route.useLoaderData();
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
    console.log('_auth :: setting exercises and loading');
    setExercises(exercises);
    setLoading(false);
  }, [exercises, setExercises, setLoading]);

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
