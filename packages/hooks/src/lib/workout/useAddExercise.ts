import { ScrollView } from "react-native";

import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from "@cwt/state/stores";

import {
  useWorkoutContextWeb,
  useWorkoutContextMobile,
} from "./useWorkoutContext";

/**
 * Common logic for adding an exercise to a workout draft.
 * It retrieves the necessary store functions to manage the addition of exercises,
 * including selecting the exercise to add and performing the addition based on its tracking type.
 *
 * @returns An object containing the selected exercise ID, a function to set it,
 *          a function to add the exercise, and a function to get exercise details by ID.
 */
function useAddExerciseLogic() {
  const selectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.selectedExerciseIDToAdd,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );
  const addExercise = useWorkoutDraftStore((state) => state.addExercise);
  const getExerciseById = useExerciseLibraryStore(
    (state) => state.getExerciseByID,
  );

  return {
    selectedExerciseIDToAdd,
    setSelectedExerciseIDToAdd,
    addExercise,
    getExerciseById,
  };
}

/**
 * Hook for adding an exercise to a workout draft in a web context.
 * @returns An object containing the selected exercise ID and a function to handle adding the exercise.
 */
export function useAddExercise() {
  const {
    selectedExerciseIDToAdd,
    setSelectedExerciseIDToAdd,
    addExercise,
    getExerciseById,
  } = useAddExerciseLogic();

  // const handler =
  //   useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayHandler;

  const handleAddExercise = () => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type,
    );

    setSelectedExerciseIDToAdd(null);
    // handler!.close();
  };

  return {
    selectedExerciseIDToAdd,
    handleAddExercise,
  };
}

/**
 * Hook for adding an exercise to a workout draft in a mobile context.
 * @returns An object containing the selected exercise ID and a function to handle adding the exercise.
 */
export function useAddExerciseMobile() {
  const {
    selectedExerciseIDToAdd,
    setSelectedExerciseIDToAdd,
    addExercise,
    getExerciseById,
  } = useAddExerciseLogic();

  const setIsVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      ?.setIsAddExerciseOverlayVisible;

  const handleAddExercisePress = (
    workoutDataScrollViewRef: null | React.RefObject<ScrollView | null>,
  ) => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type,
    );

    setSelectedExerciseIDToAdd(null);
    setIsVisible?.(false);
    workoutDataScrollViewRef!.current?.scrollToEnd({ animated: true });
  };

  return {
    selectedExerciseIDToAdd,
    handleAddExercisePress,
  };
}
