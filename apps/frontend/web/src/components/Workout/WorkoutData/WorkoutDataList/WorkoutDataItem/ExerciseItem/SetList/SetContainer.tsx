import * as React from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutDataContext } from '../../../../../../../contexts/WorkoutDataContext';
import { WorkoutExerciseContext } from '../../../../../../../contexts/WorkoutExerciseContextUpdated';
// import { WorkoutExerciseContext } from '../../../../../../contexts/WorkoutExerciseContext';
import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
// import { SetContext } from '../../../../../../contexts/SetContext';
import Set from './Set';
import type { Exercise } from '@cwt/schema/workouts';

export default function SetContainer() {
  // const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;
  // const exercise = React.useContext(WorkoutDataContext)?.item as Exercise;
  const exercise = React.useContext(WorkoutExerciseContext)
    ?.exercise as Exercise;
  const set = React.useContext(SetContext)!.set;
  const setIndex = React.useContext(SetContext)!.setIndex;

  const deleteSetOverlayHandler =
    React.useContext(WorkoutDataContext)!.deleteSetOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  // const exercise = useWorkoutDraftStore(
  //   (state) => state.workoutData[exerciseIndex],
  // ) as Exercise;
  const sets = exercise.sets;

  const toggleCompleted = useWorkoutDraftStore(
    (state) => state.toggleCompletedUpdated,
  );
  const setSetIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  // const setSelectedSetIndexToMod = useWorkoutDraftStore(
  //   (state) => state.setSelectedSetIndexToMod,
  // );
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  // const setSelectedExerciseIndexToMod = useWorkoutDraftStore(
  //   (state) => state.setSelectedExerciseIndexToMod,
  // );

  const onDeleteSetClick = () => {
    setSetIDToMod(set.id);
    setExerciseIDToMod(exercise.id);
    // setSelectedExerciseIndexToMod(exerciseIndex);

    deleteSetOverlayHandler.open();
  };

  const handleToggleCompleted = (value: boolean) => {
    toggleCompleted(null, null, exercise.id, set.id, value);
  };

  return (
    <Set
      mode={mode!}
      setIndex={setIndex}
      isCompleted={set.completed}
      handleToggleCompleted={handleToggleCompleted}
      showDeleteButton={sets.length > 1}
      onDeleteSetClick={onDeleteSetClick}
    />
  );
}
