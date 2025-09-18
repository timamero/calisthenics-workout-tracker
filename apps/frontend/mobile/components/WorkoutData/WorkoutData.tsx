import * as React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

// import { useStore } from '@cwt/state/store';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutExercise from './WorkoutExercise';
import ConfirmationDialog from '../common/ConfirmationDialog';
import { CustomTheme } from '../../theme';
import { Text } from '../../customText';

export default function WorkoutData() {
  const theme = useTheme() as CustomTheme;

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
      <WorkoutExercise
        key={ex.id}
        workoutExercise={ex}
        exerciseIndex={i}
        handleOpenDialog={() => setIsDeleteExerciseDialogVisible(true)}
        handleDeleteSetDialog={() => setIsDeleteSetDialogVisible(true)}
      />
    );
  });

  const EmptyWorkoutPlaceholder = () => {
    if (workoutData.exercises.length === 0) {
      return (
        <View
          style={{
            borderColor: theme.colors.grey,
            borderWidth: 2,
            borderStyle: 'dashed',
            display: 'flex',
            alignItems: 'center',
            marginInline: 20,
            padding: 16,
            gap: 16,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              color: theme.colors.light,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Ready to start building your workout?
          </Text>
          <Text style={{ color: theme.colors.light, textAlign: 'center' }}>
            Add your first exercise to begin
          </Text>
        </View>
      );
    }
  };

  return (
    // <Stack gap="xl" align="center">
    <View>
      <EmptyWorkoutPlaceholder />
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
