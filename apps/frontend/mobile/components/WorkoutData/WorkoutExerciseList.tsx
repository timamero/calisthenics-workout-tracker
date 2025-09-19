import * as React from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';

import WorkoutExerciseContainer from './WorkoutExerciseContainer';

interface WorkoutExerciseListProps {
  setIsDeleteExerciseDialogVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsDeleteSetDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WorkoutExerciseList({
  setIsDeleteExerciseDialogVisible,
  setIsDeleteSetDialogVisible,
}: WorkoutExerciseListProps) {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);

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
  return <>{workoutExercises}</>;
}
