import { AddExerciseOverlayProps } from '@cwt/schema/ui';

import AddExerciseOverlayUI from './AddExerciseOverlayUI';
import { useAddExercise, type UseAddExerciseMobileResult } from '@cwt/hooks';

export default function AddExerciseOverlay({
  workoutDataScrollViewRef,
}: AddExerciseOverlayProps) {
  const {
    isVisible,
    setIsVisible,
    selectedExerciseIDToAdd,
    handleAddExercisePress,
  } = useAddExercise('mobile') as UseAddExerciseMobileResult;

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
