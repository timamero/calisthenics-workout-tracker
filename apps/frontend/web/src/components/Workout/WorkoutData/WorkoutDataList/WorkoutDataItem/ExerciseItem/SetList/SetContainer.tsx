import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutContext } from '../../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../../contexts/WorkoutDataItemContext';
import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import Set from './Set';

export default function SetContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const set = useContext(SetContext)!.set;
  const setIndex = useContext(SetContext)!.setIndex;
  const deleteSetOverlayHandler =
    useContext(WorkoutContext)!.deleteSetOverlayHandler;
  const sets = exercise.sets;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const toggleCompleted = useWorkoutDraftStore(
    (state) => state.toggleCompletedUpdated,
  );
  const setSetIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );

  const onDeleteSetClick = () => {
    setSetIDToMod(set.id);
    setExerciseIDToMod(exercise.id);

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
