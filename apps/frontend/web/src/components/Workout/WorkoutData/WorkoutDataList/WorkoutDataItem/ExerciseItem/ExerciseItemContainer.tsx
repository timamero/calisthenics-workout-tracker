import { useContext } from 'react';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import ExerciseItem from './ExerciseItem';

export default function ExerciseItemContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;

  console.log('parentSectionID', parentSectionID);
  console.log('parentSupersetID', parentSupersetID);
  console.log('parentType', parentType);

  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)!.deleteRootItemOverlayHandler;
  const deleteNestedItemOverlayHandler =
    useContext(WorkoutContext)!.deleteNestedItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const addSet = useWorkoutDraftStore((state) => state.addSetUpdated);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const name = getExerciseNameById(exercise!.exercise_id);

  const handleAddSetClick = () => {
    setExerciseIDToMod(exercise!.id);

    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    addSet();
  };

  const handleDeleteExerciseClick = () => {
    setExerciseIDToMod(exercise!.id);

    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentSectionID || parentSupersetID) {
      deleteNestedItemOverlayHandler.open();
    } else {
      deleteRootItemOverlayHandler.open();
    }
  };

  return (
    <ExerciseItem
      mode={mode!}
      name={name}
      handleAddSetClick={handleAddSetClick}
      handleDeleteExerciseClick={handleDeleteExerciseClick}
    />
  );
}
