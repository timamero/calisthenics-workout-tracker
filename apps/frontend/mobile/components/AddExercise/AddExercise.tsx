// import { AddExerciseOverlayProps } from '@cwt/schema/workouts';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAddExerciseMobile } from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  const navigation = useNavigation<any>();

  const { selectedExerciseIDToAdd, handleAddExercisePress } =
    useAddExerciseMobile();

  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;
  const workoutDataScrollViewRef =
    useContext(WorkoutDraftContext)?.workoutDataScrollViewRef!;

  // const isVisible =
  //   useWorkoutContextMobile().mobileOverlayHandlers
  //     ?.isAddExerciseOverlayVisible;
  // const setIsVisible =
  //   useWorkoutContextMobile().mobileOverlayHandlers
  //     ?.setIsAddExerciseOverlayVisible;

  const handleAddExercise = () => {
    handleAddExercisePress(workoutDataScrollViewRef!);
    setIsAddWorkoutItemButtonsVisible(true);

    navigation.goBack();
  };

  return (
    <AddExerciseUI
      // isVisible={isVisible!}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      // setIsVisible={setIsVisible!}
      handleAddExercisePress={() => handleAddExercise()}
    />
  );
}
