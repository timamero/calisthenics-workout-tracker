import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutContext } from '@cwt/context';
import { WorkoutDataItemContext } from '@cwt/context';
import { SetContext } from '@cwt/context';
import Set from './Set';

export default function SetContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const set = useContext(SetContext)!.set;
  const setIndex = useContext(SetContext)!.setIndex;
  const deleteSetOverlayHandler =
    useContext(WorkoutContext)!.deleteSetOverlayHandler;
  const deleteSetInSupersetOverlayHandler =
    useContext(WorkoutContext)!.deleteSetInSupersetOverlayHandler;
  const sets = exercise.sets;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const toggleCompleted = useWorkoutDraftStore(
    (state) => state.toggleCompleted,
  );
  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSetIndexToMod,
  );
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
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentType !== 'superset') {
      setSetIDToMod(set.id);
      setExerciseIDToMod(exercise!.id);
      if (deleteSetOverlayHandler) deleteSetOverlayHandler.open();
    } else {
      setSetIndexToMod(setIndex);
      if (deleteSetInSupersetOverlayHandler)
        deleteSetInSupersetOverlayHandler.open();
    }
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
