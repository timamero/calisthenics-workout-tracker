import * as React from 'react';
import { View } from 'react-native';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';

import WorkoutExerciseContainer from './WorkoutExerciseContainer';
import ConfirmationDialog from '../common/ConfirmationDialog';
import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';

export default function WorkoutData() {
  const [isDeleteExerciseDialogVisible, setIsDeleteExerciseDialogVisible] =
    React.useState<boolean>(false);
  const [isDeleteSetDialogVisible, setIsDeleteSetDialogVisible] =
    React.useState<boolean>(false);

  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const selectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.selectedExerciseIndexToMod,
  );
  const deleteSet = useWorkoutDraftStore((state) => state.deleteSet);
  const deleteExercise = useWorkoutDraftStore((state) => state.removeExercise);

  const onDeleteExercisePress = () => {
    deleteExercise(selectedExerciseIndexToMod!);
    setIsDeleteExerciseDialogVisible(false);
  };

  const onDeleteSetPress = () => {
    deleteSet(selectedExerciseIndexToMod!);
    setIsDeleteSetDialogVisible(false);
  };

  const workoutExercises = workoutData.exercises.map((ex, i) => {
    return (
      <WorkoutExerciseContext.Provider
        key={ex.id}
        value={{
          workoutExercise: ex,
          exerciseIndex: i,
          setIsDeleteExerciseDialogVisible: setIsDeleteExerciseDialogVisible,
          setIsDeleteSetDialogVisible: setIsDeleteSetDialogVisible,
        }}
      >
        <WorkoutExerciseContainer />
      </WorkoutExerciseContext.Provider>
    );
  });

  return (
    <View>
      {workoutData.exercises.length === 0 && <EmptyWorkoutPlaceholder />}
      {workoutExercises}
      <ConfirmationDialog
        title="Delete Exercise"
        message="Delete exercise from this workout?"
        confirmButtonLabel="Delete exercise"
        isVisible={isDeleteExerciseDialogVisible}
        handleHideDialog={setIsDeleteExerciseDialogVisible}
        onConfirmationPress={() => onDeleteExercisePress()}
      />
      <ConfirmationDialog
        title="Delete Set"
        message="Delete set from this exercise?"
        confirmButtonLabel="Delete"
        isVisible={isDeleteSetDialogVisible}
        handleHideDialog={setIsDeleteSetDialogVisible}
        onConfirmationPress={() => onDeleteSetPress()}
      />
    </View>
  );
}
