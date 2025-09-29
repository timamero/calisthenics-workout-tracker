import * as React from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../../../../../contexts/WorkoutExerciseContext';
import { SetContext } from '../../../../../../contexts/SetContext';
import Set from './Set';
import { Mode } from '@cwt/schema/workouts';

export default function SetContainer() {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const setIsDeleteSetDialogVisible = React.useContext(
    WorkoutExerciseContext,
  )!.setIsDeleteSetDialogVisible;

  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const sets = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].sets;

  const toggleCompleted = useWorkoutDraftStore(
    (state) => state.toggleCompleted,
  );
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

  const handleToggleCompleted = () => {
    toggleCompleted(exerciseIndex, setIndex, !sets[setIndex].completed);
  };

  return (
    <Set
      mode={mode}
      setIndex={setIndex}
      isCompleted={sets[setIndex].completed}
      handleToggleCompleted={handleToggleCompleted}
      showDeleteButton={sets.length > 1}
      onDeleteSetPress={onDeleteSetPress}
    />
  );
}
