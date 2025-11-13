import { useState, useContext } from "react";
import { ScrollView } from "react-native";

import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from "@cwt/state/stores";
import { AppTypeSchema } from "@cwt/schema/common";
import { OverlayContext } from "@cwt/context";

export function useAddExercise(appType: AppTypeSchema) {
  const opened = useContext(OverlayContext)?.addExerciseOverlayOpened;
  const handler = useContext(OverlayContext)?.addExerciseOverlayHandler;

  const isVisible = useContext(OverlayContext)?.isAddExerciseOverlayVisible;
  const setIsVisible =
    useContext(OverlayContext)?.setIsAddExerciseOverlayVisible;

  const selectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.selectedExerciseIDToAdd
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd
  );
  const addExercise = useWorkoutDraftStore((state) => state.addExerciseUpdated);
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
    };
  } else if (appType == "mobile") {
    return {
      isVisible,
      setIsVisible,
      selectedExerciseIDToAdd,
      handleAddExercisePress: handleAddExerciseAction,
    };
  }
}
