import { useEffect } from 'react';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import type { ExerciseResponse } from '@cwt/schema/exercises';

export function useSetExercisesData(exercises: ExerciseResponse[]) {
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );
  console.log('useSetExercisesData hook called');
  useEffect(() => {
    if (!isExercisesSet) {
      console.log('setting exercises in useEffect');
      setExercises(exercises);
      setLoading(false);
    }
  }, [exercises, isExercisesSet, setExercises, setLoading]);
}
