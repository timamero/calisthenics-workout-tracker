import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { useAuthStore, useExerciseLibraryStore } from '@cwt/state/stores';
import type { ExerciseResponse } from '@cwt/schema/exercises';

import { getExercises } from '../services/exercisesService';

import WorkoutDraft from '../components/WorkoutDraft';

export const Route = createFileRoute('/workout')({
  loader: async () => {
    console.log('loading exercises in workout route');
    const displayedExercises =
      useExerciseLibraryStore.getState().displayedExercises;
    const isExercisesFetched =
      useExerciseLibraryStore.getState().isExercisesFetched;

    if (isExercisesFetched) {
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

  const isExercisesFetched = useExerciseLibraryStore(
    (state) => state.isExercisesFetched,
  );
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setIsExercisesFetched = useExerciseLibraryStore(
    (state) => state.setIsExercisesFetched,
  );

  useEffect(() => {
    if (!isExercisesFetched) {
      console.log('setting exercises in useEffect');
      setExercises(exercises);
      setIsExercisesFetched(true);
    }
  }, [exercises, isExercisesFetched, setExercises, setIsExercisesFetched]);
  return <WorkoutDraft />;
}
