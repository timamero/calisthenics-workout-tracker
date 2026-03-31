import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';

import { useAuthStore, useExerciseLibraryStore } from '@cwt/state/stores';
import type { ExerciseResponse } from '@cwt/schema/exercises';

import { getExercises } from '../services/exercisesService';

import WorkoutDraft from '../components/WorkoutDraft';

export const Route = createFileRoute('/workout')({
  loader: async () => {
    console.log('loading exercises in workout route');
    const displayedExercises =
      useExerciseLibraryStore.getState().displayedExercises;

    if (displayedExercises) {
      console.log('exercises alreaded fetched');
      return displayedExercises;
    }

    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      console.time('fetch exercises in workout');
      const exercises = await getExercises(supabaseSession.access_token);
      console.timeEnd('fetch exercises in workout');
      return exercises;
    }
  },
  component: WorkoutView,
});

function WorkoutView() {
  const exercises: ExerciseResponse[] = Route.useLoaderData();

  const loading = useExerciseLibraryStore((state) => state.loading);
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  useEffect(() => {
    if (!isExercisesSet) {
      console.log('setting exercises in useEffect');
      setExercises(exercises);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isExercisesSet) {
      setLoading(false);
    }
  }, [isExercisesSet, setLoading]);

  if (!isExercisesSet || loading) {
    return (
      <Stack>
        <Title size="h6">Loading</Title>
      </Stack>
    );
  }
  return <WorkoutDraft />;
}
