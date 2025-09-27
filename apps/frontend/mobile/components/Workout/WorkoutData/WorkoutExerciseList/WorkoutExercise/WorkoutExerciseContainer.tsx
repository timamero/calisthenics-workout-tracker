import * as React from 'react';

import type {
  Mode,
  WorkoutExercise as WorkoutExerciseType,
} from '@cwt/schema/workouts';
import {
  useExerciseLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

import WorkoutExercise from './WorkoutExercise';
import { WorkoutExerciseContext } from '../../../../../contexts/WorkoutExerciseContext';

export default function WorkoutExerciseContainer() {
  const exerciseIndex: number = React.useContext(
    WorkoutExerciseContext,
  )!.exerciseIndex;
  const workoutExercise: WorkoutExerciseType = React.useContext(
    WorkoutExerciseContext,
  )!.workoutExercise;
  const setIsDeleteExerciseDialogVisible = React.useContext(
    WorkoutExerciseContext,
  )!.setIsDeleteExerciseDialogVisible;

  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
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
      mode={mode}
      name={name}
      exerciseIndex={exerciseIndex}
      handleAddSet={addSet}
      handleDeleteExercisePress={handleDeleteExercisePress}
    />
  );
}
