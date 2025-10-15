import * as React from 'react';
// import { Stack, Text, Button, Group } from '@mantine/core';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutExerciseContext } from '../../../../../contexts/WorkoutExerciseContext';
import WorkoutExercise from './WorkoutExercise';
// import Sets from './Sets';

export default function WorkoutExerciseContainer() {
  const exerciseIndex: number = React.useContext(
    WorkoutExerciseContext,
  )!.exerciseIndex;
  const workoutExercise: Exercise = React.useContext(
    WorkoutExerciseContext,
  )!.workoutExercise;
  const deleteExOverlayHandler = React.useContext(
    WorkoutExerciseContext,
  )!.deleteExOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const setSelectedExerciseIndexToDel = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(workoutExercise.exercise_id);

  const handleDeleteExerciseClick = () => {
    setSelectedExerciseIndexToDel(exerciseIndex);
    deleteExOverlayHandler.open();
  };

  return (
    <WorkoutExercise
      mode={mode!}
      name={name}
      exerciseIndex={exerciseIndex}
      handleAddSetClick={addSet}
      handleDeleteExerciseClick={handleDeleteExerciseClick}
    />
  );
}
