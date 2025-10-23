import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutContext } from '../../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../../contexts/WorkoutDataItemContext';
import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import Set from './Set';

export default function SetContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  // console.log('parentSectionID', parentSectionID);
  // console.log('parentSupersetID', parentSupersetID);

  const set = useContext(SetContext)!.set;
  const setIndex = useContext(SetContext)!.setIndex;
  const deleteSetOverlayHandler =
    useContext(WorkoutContext)!.deleteSetOverlayHandler;
  const sets = exercise.sets;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const toggleCompleted = useWorkoutDraftStore(
    (state) => state.toggleCompletedUpdated,
  );
  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleDeleteSetClick = () => {
    // console.log('delete set clicked');
    setSetIDToMod(set.id);
    setExerciseIDToMod(exercise.id);

    if (parentSupersetID) {
      // console.log('setting parent superset id');
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      // console.log('setting parent section id');
      setSectionIDToMod(parentSectionID);
    }

    deleteSetOverlayHandler.open();
  };

  const handleToggleCompleted = (value: boolean) => {
    // console.log('delete set clicked');
    setSetIDToMod(set.id);
    setExerciseIDToMod(exercise.id);

    if (parentSupersetID) {
      // console.log('setting parent superset id');
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      // console.log('setting parent section id');
      setSectionIDToMod(parentSectionID);
    }
    toggleCompleted(value);
  };

  return (
    <Set
      mode={mode!}
      setsLength={sets.length}
      setIndex={setIndex}
      isCompleted={set.completed}
      handleToggleCompleted={handleToggleCompleted}
      showDeleteButton={sets.length > 1}
      handleDeleteSetClick={handleDeleteSetClick}
    />
  );
}
