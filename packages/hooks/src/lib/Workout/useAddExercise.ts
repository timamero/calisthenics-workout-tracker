import { useContext } from "react";
import { ScrollView } from "react-native";
import { type UseDisclosureHandlers } from "@mantine/hooks";

import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from "@cwt/state/stores";
import { AppTypeSchema } from "@cwt/schema/common";
import { WorkoutContext } from "@cwt/context";

export interface UseAddExerciseWebResult {
  opened: boolean;
  handler: UseDisclosureHandlers;
  selectedExerciseIDToAdd: number | null;
  handleAddExerciseClick: () => void;
}
export interface UseAddExerciseMobileResult {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedExerciseIDToAdd: number | null;
  handleAddExercisePress: (
    workoutDataScrollViewRef: null | React.RefObject<ScrollView | null>
  ) => void;
}

export function useAddExercise(
  appType: AppTypeSchema
): UseAddExerciseMobileResult | UseAddExerciseWebResult | undefined {
  const opened = useContext(WorkoutContext)?.addExerciseOverlayOpened;
  const handler = useContext(WorkoutContext)?.addExerciseOverlayHandler;

  const isVisible = useContext(WorkoutContext)?.isAddExerciseOverlayVisible;
  const setIsVisible =
    useContext(WorkoutContext)?.setIsAddExerciseOverlayVisible;

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
  const handleAddExerciseAction = (
    workoutDataScrollViewRef: null | React.RefObject<ScrollView | null>
  ) => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type
    );

    if (appType == "web") {
      setSelectedExerciseIDToAdd(null);
      handler!.close();
    } else if (appType == "mobile") {
      setSelectedExerciseIDToAdd(null);
      setIsVisible?.(false);
      workoutDataScrollViewRef!.current?.scrollToEnd({ animated: true });
    }
  };

  if (appType == "web") {
    return {
      opened,
      handler,
      selectedExerciseIDToAdd,
      handleAddExerciseClick: handleAddExerciseAction,
    } as UseAddExerciseWebResult;
  } else if (appType == "mobile") {
    return {
      isVisible,
      setIsVisible,
      selectedExerciseIDToAdd,
      handleAddExercisePress: handleAddExerciseAction,
    } as UseAddExerciseMobileResult;
  }
}
