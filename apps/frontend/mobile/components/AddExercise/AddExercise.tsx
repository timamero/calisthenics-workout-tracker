// import { AddExerciseOverlayProps } from '@cwt/schema/workouts';
import { RefObject } from 'react';
import { ScrollView } from 'react-native';

import AddExerciseUI from './AddExerciseUI';
import { useAddExerciseMobile } from '@cwt/hooks';

export default function AddExercise({
  workoutDataScrollViewRef,
}: {
  workoutDataScrollViewRef?: RefObject<ScrollView | null>;
}) {
  const { selectedExerciseIDToAdd, handleAddExercisePress } =
    useAddExerciseMobile();

  // const isVisible =
  //   useWorkoutContextMobile().mobileOverlayHandlers
  //     ?.isAddExerciseOverlayVisible;
  // const setIsVisible =
  //   useWorkoutContextMobile().mobileOverlayHandlers
  //     ?.setIsAddExerciseOverlayVisible;

  return (
    <AddExerciseUI
      // isVisible={isVisible!}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      // setIsVisible={setIsVisible!}
      handleAddExercisePress={() =>
        handleAddExercisePress(workoutDataScrollViewRef!)
      }
    />
  );
}
