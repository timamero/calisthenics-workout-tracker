import { useContext } from 'react';

import type { Mode, Exercise } from '@cwt/schema/workouts';
import {
  useExerciseLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import { WorkoutDataItemContext, WorkoutContext } from '@cwt/context';

import ExerciseItem from './ExerciseItem';

export default function ExerciseItemContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  const parentLength = useContext(WorkoutDataItemContext)?.parentItemsLength;

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

  const handleAddSetPress = () => {
    setExerciseIDToMod(exercise!.id);

    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    addSet();
  };

  const handleUpPress = () => {
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
  const handleDownPress = () => {
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

  const handleDeleteExercisePress = () => {
    setExerciseIDToMod(exercise!.id);

    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentSectionID || parentSupersetID) {
      if (deleteNestedItemOverlayHandler) deleteNestedItemOverlayHandler.open();
    } else {
      if (deleteRootItemOverlayHandler) deleteRootItemOverlayHandler.open();
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
      handleUpPress={handleUpPress}
      handleDownPress={handleDownPress}
      handleAddSetPress={handleAddSetPress}
      handleDeleteExercisePress={handleDeleteExercisePress}
    />
  );
}
