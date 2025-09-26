import * as React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { Mode } from '@cwt/schema/workouts';

import ConfirmationDialog from '../../common/ConfirmationDialog';
import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';
import WorkoutExerciseList from './WorkoutExerciseList';

interface WorkoutDataProps {
  scrollViewRef: React.RefObject<ScrollView | null>;
}

export default function WorkoutData({ scrollViewRef }: WorkoutDataProps) {
  const [isDeleteExerciseDialogVisible, setIsDeleteExerciseDialogVisible] =
    React.useState<boolean>(false);
  const [isDeleteSetDialogVisible, setIsDeleteSetDialogVisible] =
    React.useState<boolean>(false);

  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).exercises.length;
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

  return (
    <KeyboardAvoidingView
      style={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={{ marginBottom: 72, flexGrow: 1 }} ref={scrollViewRef}>
        {workoutExercisesLength === 0 && (
          <EmptyWorkoutPlaceholder mode={mode} />
        )}
        <WorkoutExerciseList
          setIsDeleteExerciseDialogVisible={setIsDeleteExerciseDialogVisible}
          setIsDeleteSetDialogVisible={setIsDeleteSetDialogVisible}
        />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
