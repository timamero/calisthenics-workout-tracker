import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import {
  // WorkoutContext,
  WorkoutDataItemContext,
  SetContext,
} from '@cwt/context';
import { useDeleteSetMobile, useToggleCompleted } from '@cwt/hooks';
import { Exercise } from '@cwt/schema/workouts';

import Set from './Set';
// import { Mode } from '@cwt/schema/workouts';

export default function SetContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  // const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  // const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const set = useContext(SetContext)!.set;
  const setIndex = useContext(SetContext)!.setIndex;
  // const setIsDeleteSetOverlayVisible =
  //   useContext(WorkoutContext)!.setIsDeleteSetOverlayVisible;
  const sets = exercise.sets;

  const mode = useWorkoutDraftStore((state) => state.mode);
  // const toggleCompleted = useWorkoutDraftStore(
  //   (state) => state.toggleCompleted,
  // );
  // const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  // const setExerciseIDToMod = useWorkoutDraftStore(
  //   (state) => state.setExerciseIDToMod,
  // );
  // const setSupersetIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSupersetIDToMod,
  // );
  // const setSectionIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSectionIDToMod,
  // );

  const handleDeleteSetPress = useDeleteSetMobile().handleDeleteSetPress;
  // const onDeleteSetPress = () => {
  //   setSetIDToMod(set.id);
  //   setExerciseIDToMod(exercise.id);

  //   if (parentSupersetID) {
  //     setSupersetIDToMod(parentSupersetID);
  //   }
  //   if (parentSectionID) {
  //     setSectionIDToMod(parentSectionID);
  //   }

  //   if (setIsDeleteSetOverlayVisible) setIsDeleteSetOverlayVisible(true);
  // };

  const handleToggleCompleted = useToggleCompleted();

  return (
    <Set
      mode={mode!}
      setsLength={sets.length}
      setIndex={setIndex}
      isCompleted={set.completed}
      handleToggleCompleted={handleToggleCompleted}
      showDeleteButton={sets.length > 1}
      onDeleteSetPress={handleDeleteSetPress}
    />
  );
}
