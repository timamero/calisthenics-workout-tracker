import * as React from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';
import { SetContext } from '../../contexts/SetContext';
import Set from './Set';

export default function SetContainer() {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const setIsDeleteSetDialogVisible = React.useContext(
    WorkoutExerciseContext,
  )!.setIsDeleteSetDialogVisible;

  const sets = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].sets;

  const setSelectedSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedSetIndexToMod,
  );
  const setSelectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );

  const onDeleteSetPress = () => {
    setSelectedSetIndexToMod(setIndex);
    setSelectedExerciseIndexToMod(exerciseIndex);
    setIsDeleteSetDialogVisible(true);
  };

  return (
    <Set
      setIndex={setIndex}
      showDeleteButton={sets.length > 1}
      onDeleteSetPress={onDeleteSetPress}
    />
  );
}
