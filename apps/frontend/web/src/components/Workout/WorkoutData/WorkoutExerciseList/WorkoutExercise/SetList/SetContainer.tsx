import * as React from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../../../../../contexts/WorkoutExerciseContext';
import { SetContext } from '../../../../../../contexts/SetContext';
import Set from './Set';
import type { Exercise } from '@cwt/schema/workouts';

export default function SetContainer() {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const deleteSetOverlayHandler = React.useContext(
    WorkoutExerciseContext,
  )!.deleteSetOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const exercise = useWorkoutDraftStore(
    (state) => state.workoutData[exerciseIndex],
  ) as Exercise;
  const sets = exercise.sets;

  const toggleCompleted = useWorkoutDraftStore(
    (state) => state.toggleCompleted,
  );
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

  const handleToggleCompleted = (value: boolean) => {
    toggleCompleted(exerciseIndex, setIndex, value);
  };

  return (
    <Set
      mode={mode!}
      setIndex={setIndex}
      isCompleted={sets[setIndex].completed}
      handleToggleCompleted={handleToggleCompleted}
      showDeleteButton={sets.length > 1}
      onDeleteSetClick={onDeleteSetClick}
    />
  );
}
