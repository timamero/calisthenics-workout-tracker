import { useContext } from 'react';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import ExerciseItem from './ExerciseItem';

export default function ExerciseItemContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  console.log('exercise order ', exercise.order);
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  const parentLength = useContext(WorkoutDataItemContext)?.parentItemsLength;
  // const parentType = useContext(WorkoutDataItemContext)?.parentType;

  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)!.deleteRootItemOverlayHandler;
  const deleteNestedItemOverlayHandler =
    useContext(WorkoutContext)!.deleteNestedItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );
  const addSet = useWorkoutDraftStore((state) => state.addSetUpdated);
  const reorderRootItem = useWorkoutDraftStore(
    (state) => state.reorderRootItem,
  );
  const reorderNestedItem = useWorkoutDraftStore(
    (state) => state.reorderNestedItem,
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

  const handleUpClick = () => {
    if (!parentSectionID && !parentSupersetID) {
      reorderRootItem(exercise!.id, exercise!.order - 1);
    } else {
      setExerciseIDToMod(exercise!.id);

      if (parentSupersetID) {
        setSupersetIDToMod(parentSupersetID);
      }
      if (parentSectionID) {
        setSectionIDToMod(parentSectionID);
      }
      reorderNestedItem(exercise!.order - 1);
    }
  };
  const handleDownClick = () => {
    if (!parentSectionID && !parentSupersetID) {
      reorderRootItem(exercise!.id, exercise!.order + 1);
    } else {
      setExerciseIDToMod(exercise!.id);

      if (parentSupersetID) {
        setSupersetIDToMod(parentSupersetID);
      }
      if (parentSectionID) {
        setSectionIDToMod(parentSectionID);
      }
      reorderNestedItem(exercise!.order + 1);
    }
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

  const useParentItemsLength = () => {
    if (!parentSectionID && !parentSupersetID) {
      return rootWorkoutDataLength;
    }
    // const length = useContext(WorkoutDataItemContext)?.parentItemsLength;
    return parentLength ? parentLength : 0;
  };

  return (
    <ExerciseItem
      mode={mode!}
      name={name}
      isFirst={exercise!.order === 0}
      isLast={exercise!.order === useParentItemsLength() - 1}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleAddSetClick={handleAddSetClick}
      handleDeleteExerciseClick={handleDeleteExerciseClick}
    />
  );
}
