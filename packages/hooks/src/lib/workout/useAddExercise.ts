import { ScrollView } from "react-native";

import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from "@cwt/state/stores";

import {
  useWorkoutContextWeb,
  useWorkoutContextMobile,
} from "./useWorkoutContext";

function useAddExerciseLogic() {
  const selectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.selectedExerciseIDToAdd
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd
  );
  const addExercise = useWorkoutDraftStore((state) => state.addExercise);
  const getExerciseById = useExerciseLibraryStore(
    (state) => state.getExerciseByID
  );

  return {
    selectedExerciseIDToAdd,
    setSelectedExerciseIDToAdd,
    addExercise,
    getExerciseById,
  };
}

export function useAddExercise() {
  const {
    selectedExerciseIDToAdd,
    setSelectedExerciseIDToAdd,
    addExercise,
    getExerciseById,
  } = useAddExerciseLogic();

  const handler =
    useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayHandler;

  const handleAddExerciseClick = () => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type
    );

    setSelectedExerciseIDToAdd(null);
    handler!.close();
  };

  return {
    selectedExerciseIDToAdd,
    handleAddExerciseClick,
  };
}

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
    workoutDataScrollViewRef: null | React.RefObject<ScrollView | null>
  ) => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type
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
