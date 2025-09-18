import * as React from 'react';

import type { WorkoutExercise as WorkoutExerciseType } from '@cwt/schema/workouts';
import {
  useExerciseLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

import WorkoutExercise from './WorkoutExercise';
import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';

interface WorkoutExerciseProps {
  // exerciseIndex: number;
  // workoutExercise: WorkoutExerciseType;
  // handleOpenDialog: () => void;
  // handleDeleteSetDialog: () => void;
}

export default function WorkoutExerciseContainer(
  {
    // exerciseIndex,
    // workoutExercise,
    // handleOpenDialog,
    // handleDeleteSetDialog,
  }: WorkoutExerciseProps,
) {
  const exerciseIndex: number = React.useContext(
    WorkoutExerciseContext,
  )!.exerciseIndex;
  const workoutExercise: WorkoutExerciseType = React.useContext(
    WorkoutExerciseContext,
  )!.workoutExercise;
  const setIsDeleteExerciseDialogVisible = React.useContext(
    WorkoutExerciseContext,
  )!.setIsDeleteExerciseDialogVisible;
  // const set;

  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const setSelectedExerciseIndexToDel = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(workoutExercise!.exercise_id);

  const handleDeleteExercisePress = () => {
    setSelectedExerciseIndexToDel(exerciseIndex);
    setIsDeleteExerciseDialogVisible(true);
  };

  return (
    <WorkoutExercise
      name={name}
      exerciseIndex={exerciseIndex}
      handleAddSet={addSet}
      handleDeleteExercisePress={handleDeleteExercisePress}
      // handleDeleteSetDialog={handleDeleteSetDialog}
    />
  );
}
