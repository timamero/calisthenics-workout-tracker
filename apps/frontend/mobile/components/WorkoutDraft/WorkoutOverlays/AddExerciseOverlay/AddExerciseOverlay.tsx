import { AddExerciseOverlayProps } from '@cwt/schema/workouts';

import AddExerciseOverlayUI from './AddExerciseOverlayUI';
import { useAddExerciseMobile, useWorkoutContextMobile } from '@cwt/hooks';

export default function AddExerciseOverlay({
  workoutDataScrollViewRef,
}: AddExerciseOverlayProps) {
  const { selectedExerciseIDToAdd, handleAddExercisePress } =
    useAddExerciseMobile();

  const isVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      ?.isAddExerciseOverlayVisible;
  const setIsVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      ?.setIsAddExerciseOverlayVisible;

  return (
    <AddExerciseOverlayUI
      isVisible={isVisible!}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      setIsVisible={setIsVisible!}
      handleAddExercisePress={() =>
        handleAddExercisePress(workoutDataScrollViewRef!)
      }
    />
  );
}
