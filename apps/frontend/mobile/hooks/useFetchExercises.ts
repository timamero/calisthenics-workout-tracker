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
        console.time('fetch exercises');
        const exercises = await getExercises(supabaseSession.access_token);
        console.timeEnd('fetch exercises');
        if (exercises) {
          setExercises(exercises);
          setLoading(false);
        }
      }
    };

    if (!isExercisesSet) {
      asyncFetchData();
    }
  }, [setExercises, supabaseSession, isExercisesSet, setLoading]);
}
