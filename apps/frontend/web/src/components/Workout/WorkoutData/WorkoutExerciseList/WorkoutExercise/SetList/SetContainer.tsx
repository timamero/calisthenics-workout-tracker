import * as React from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../../../../../contexts/WorkoutExerciseContext';
import { SetContext } from '../../../../../../contexts/SetContext';
import Set from './Set';

export default function SetContainer() {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const deleteSetOverlayHandler = React.useContext(
    WorkoutExerciseContext,
  )!.deleteSetOverlayHandler;

  const sets = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].sets;

  const setSelectedSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedSetIndexToMod,
  );
  const setSelectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );

  const onDeleteSetClick = () => {
    setSelectedSetIndexToMod(setIndex);
    setSelectedExerciseIndexToMod(exerciseIndex);
    deleteSetOverlayHandler.open();
  };

  return (
    <Set
      setIndex={setIndex}
      showDeleteButton={sets.length > 1}
      onDeleteSetClick={onDeleteSetClick}
    />
  );
}
