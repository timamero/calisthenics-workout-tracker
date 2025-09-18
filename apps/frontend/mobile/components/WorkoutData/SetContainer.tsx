import * as React from 'react';

import type { SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';
import Set from './Set';

interface SetContainerProps {
  setIndex: number;
}

export default function SetContainer({ setIndex }: SetContainerProps) {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;

  const setIsDeleteSetDialogVisible = React.useContext(
    WorkoutExerciseContext,
  )!.setIsDeleteSetDialogVisible;

  const sets = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].sets;
  const tracked = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].tracked;

  const setSelectedSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedSetIndexToMod,
  );
  const setSelectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );
  const updateField = useWorkoutDraftStore((state) => state.updateField);

  const handleSetFieldChange = (updatedField: Partial<SetFields>) => {
    setSelectedSetIndexToMod(setIndex);
    updateField(exerciseIndex, updatedField);
  };

  const onDeleteSetPress = () => {
    setSelectedSetIndexToMod(setIndex);
    setSelectedExerciseIndexToMod(exerciseIndex);
    setIsDeleteSetDialogVisible(true);
  };

  return (
    <Set
      set={sets[setIndex]}
      setIndex={setIndex}
      showDeleteButton={sets.length > 1}
      tracked={{ tracked }}
      onDeleteSetPress={onDeleteSetPress}
      handleSetFieldChange={handleSetFieldChange}
    />
  );
}
