import { useEffect } from "react";

import { useExerciseLibraryStore } from "@cwt/state/stores";
import { ExerciseResponse } from "@cwt/schema/exercises";

// import { getExercises } from '../services/exercisesService';

export function useSetExercisesData(exercises: ExerciseResponse[]) {
  // const [status, setStatus] = useState<
  //   "idle" | "pending" | "success" | "error"
  // >("idle");

  // const loading = useExerciseLibraryStore((state) => state.loading);
  // const displayedExercises = useExerciseLibraryStore(
  //   (state) => state.displayedExercises,
  // );
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  useEffect(() => {
    if (!isExercisesSet) {
      console.log("setting exercises in useEffect");
      setExercises(exercises);
      setLoading(false);
    }
  }, []);
  // useEffect(() => {
  //   if (isExercisesSet) {
  //     setLoading(false);
  //   }
  // }, [isExercisesSet, setLoading]);
}
