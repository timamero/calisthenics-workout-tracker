import { useEffect } from 'react';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import type { ExerciseResponse } from '@cwt/schema/exercises';

export function useSetExercisesData(exercises: ExerciseResponse[]) {
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  // Exercises are already set
  // if (!exercises) {
  //   console.log('useSetExerciseData :: exiting hook, exercises already set');
  //   return null
  // }
  console.log('useSetExerciseData :: isExercisesSet', isExercisesSet);
  useEffect(() => {
    console.log('useSetExerciseData :: useEffect called');
    if (!isExercisesSet) {
      console.log('useSetExerciseData :: setting exercises and loading');
      setExercises(exercises);
      setLoading(false);
    }
  }, [exercises, isExercisesSet, setExercises, setLoading]);
}
