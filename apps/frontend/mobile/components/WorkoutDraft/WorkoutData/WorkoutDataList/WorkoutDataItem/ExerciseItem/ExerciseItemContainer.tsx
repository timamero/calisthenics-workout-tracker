import { useContext } from 'react';

import type { Exercise } from '@cwt/schema/workouts';
import {
  useExerciseLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';
import {
  useDeleteItemMobile,
  useReorderItemMobile,
  useAddSetMobile,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import ExerciseItem from './ExerciseItem';

export default function ExerciseItemContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  const parentLength = useContext(WorkoutDataItemContext)?.parentItemsLength;

  // const setIsDeleteRootItemOverlayVisible =
  //   useContext(WorkoutContext)!.setIsDeleteRootItemOverlayVisible;
  // const setIsDeleteNestedItemOverlayVisible =
  //   useContext(WorkoutContext)!.setIsDeleteNestedItemOverlayVisible;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );
  // const addSet = useWorkoutDraftStore((state) => state.addSet);
  // const reorderRootItem = useWorkoutDraftStore(
  //   (state) => state.reorderRootItem,
  // );
  // const reorderNestedItem = useWorkoutDraftStore(
  //   (state) => state.reorderNestedItem,
  // );
  // const setExerciseIDToMod = useWorkoutDraftStore(
  //   (state) => state.setExerciseIDToMod,
  // );
  // const setSupersetIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSupersetIDToMod,
  // );
  // const setSectionIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSectionIDToMod,
  // );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const name = getExerciseNameById(exercise!.exercise_id);

  const handleAddSetPress = useAddSetMobile().handleAddSetPress;
  // const handleAddSetPress = () => {
  //   setExerciseIDToMod(exercise!.id);

  //   if (parentSupersetID) {
  //     setSupersetIDToMod(parentSupersetID);
  //   }
  //   if (parentSectionID) {
  //     setSectionIDToMod(parentSectionID);
  //   }

  //   addSet();
  // };

  const { handleUpPress, handleDownPress } = useReorderItemMobile(exercise);

  // const handleUpPress = useReorderItemMobile(exercise).handleUpPress;
  // const handleDownPress = useReorderItemMobile(exercise).handleDownPress;

  // const handleUpPress = () => {
  //   if (!parentSectionID && !parentSupersetID) {
  //     reorderRootItem(exercise!.id, exercise!.order - 1);
  //   } else {
  //     setExerciseIDToMod(exercise!.id);

  //     if (parentSupersetID) {
  //       setSupersetIDToMod(parentSupersetID);
  //     }
  //     if (parentSectionID) {
  //       setSectionIDToMod(parentSectionID);
  //     }
  //     reorderNestedItem(exercise!.order - 1);
  //   }
  // };
  // const handleDownPress = () => {
  //   if (!parentSectionID && !parentSupersetID) {
  //     reorderRootItem(exercise!.id, exercise!.order + 1);
  //   } else {
  //     setExerciseIDToMod(exercise!.id);

  //     if (parentSupersetID) {
  //       setSupersetIDToMod(parentSupersetID);
  //     }
  //     if (parentSectionID) {
  //       setSectionIDToMod(parentSectionID);
  //     }
  //     reorderNestedItem(exercise!.order + 1);
  //   }
  // };

  const handleDeleteExercisePress = useDeleteItemMobile(
    'exercise',
    exercise.id,
  ).handleDeleteItemPress;

  // const handleDeleteExercisePress = () => {
  //   setExerciseIDToMod(exercise!.id);

  //   if (parentSupersetID) {
  //     setSupersetIDToMod(parentSupersetID);
  //   }
  //   if (parentSectionID) {
  //     setSectionIDToMod(parentSectionID);
  //   }

  //   if (parentSectionID || parentSupersetID) {
  //     if (setIsDeleteNestedItemOverlayVisible)
  //       setIsDeleteNestedItemOverlayVisible(true);
  //   } else {
  //     if (setIsDeleteRootItemOverlayVisible)
  //       setIsDeleteRootItemOverlayVisible(true);
  //   }
  // };

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
