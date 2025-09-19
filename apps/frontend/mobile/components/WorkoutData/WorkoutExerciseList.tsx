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
  // const [isDeleteExerciseDialogVisible, setIsDeleteExerciseDialogVisible] =
  //   React.useState<boolean>(false);
  // const [isDeleteSetDialogVisible, setIsDeleteSetDialogVisible] =
  //   React.useState<boolean>(false);

  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  // const selectedExerciseIndexToMod = useWorkoutDraftStore(
  //   (state) => state.selectedExerciseIndexToMod,
  // );

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
