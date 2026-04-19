import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';

import { useAuthStore, useExerciseLibraryStore } from '@cwt/state/stores';
import type { ExerciseResponse } from '@cwt/schema/exercises';

import { useSetExercisesData } from '../../../hooks/useSetExercisesData';
import { getExercises } from '../../../services/exercisesService';

import WorkoutDraft from '../../../components/WorkoutDraft';

export const Route = createFileRoute('/_auth/workout/')({
  loader: async () => {
    const displayedExercises =
      useExerciseLibraryStore.getState().displayedExercises;
    if (displayedExercises) {
      console.log('workout index :: returning displayedExercises');
      return displayedExercises;
    }

    console.log('workout index :: fetching exercises from database');
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
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  useSetExercisesData(exercises);

  if (!isExercisesSet || loading) {
    return (
      <Stack>
        <Title size="h6">Loading</Title>
      </Stack>
    );
  }
  return <WorkoutDraft />;
}
