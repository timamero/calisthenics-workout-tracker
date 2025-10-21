import * as React from 'react';
// import { Stack, Text, Button, Group } from '@mantine/core';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutDataContext } from '../../../../../../contexts/WorkoutDataContext';
// import { WorkoutExerciseContext } from '../../../../../contexts/WorkoutExerciseContext';
import WorkoutExercise from './WorkoutExercise';
// import Sets from './Sets';

export default function WorkoutExerciseContainer() {
  const exercise = React.useContext(WorkoutDataContext)!.item as Exercise;
  const deleteRootItemOverlayHandler =
    React.useContext(WorkoutDataContext)!.deleteRootItemOverlayHandler;
  // const exerciseIndex: number = React.useContext(
  //   WorkoutExerciseContext,
  // )!.exerciseIndex;
  // const workoutExercise: Exercise = React.useContext(
  //   WorkoutExerciseContext,
  // )!.workoutExercise;
  // const deleteExOverlayHandler = React.useContext(
  //   WorkoutExerciseContext,
  // )!.deleteExOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const addSet = useWorkoutDraftStore((state) => state.addSetUpdated);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  // const setExerciseIDToMod = useWorkoutDraftStore(
  //   (state) => state.setExerciseIDToMod,
  // );
  // const setSelectedExerciseIndexToDel = useWorkoutDraftStore(
  //   (state) => state.setSelectedExerciseIndexToMod,
  // );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(exercise.exercise_id);

  const handleDeleteExerciseClick = () => {
    setExerciseIDToMod(exercise.id);
    deleteRootItemOverlayHandler.open();
  };

  return (
    <WorkoutExercise
      mode={mode!}
      name={name}
      exerciseID={exercise.id}
      handleAddSetClick={addSet}
      handleDeleteExerciseClick={handleDeleteExerciseClick}
    />
  );
}
