import { useEffect } from 'react';

import { useExerciseLibraryStore, useAuthStore } from '@cwt/state/stores';

import { getExercises } from '../services/exercisesService';

export function useFetchExercises() {
  const supabaseSession = useAuthStore((state) => state.session);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );
  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token && !isExercisesSet) {
        console.log('fetching exercises');
        const exercises = await getExercises(supabaseSession.access_token);
        if (exercises) {
          setExercises(exercises);
          setLoading(false);
        }
      }
    };

    if (!isExercisesSet) {
      console.log('calling async func for fetching and setting the exercises');
      asyncFetchData();
    }
  }, [setExercises, supabaseSession, isExercisesSet, setLoading]);
}
