import * as React from 'react';
// import { Stack, Text, Button, Group } from '@mantine/core';

// import { useExerciseLibraryStore } from '@cwt/state/stores';
// import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise, Superset, Section } from '@cwt/schema/workouts';

import { WorkoutDataContext } from '../../../../../contexts/WorkoutDataContext';
// import WorkoutDataItem from './WorkoutDataItem';
import { ExerciseItemContainer } from './ExerciseItem';
import { SectionItemContainer } from './SectionItem';
import { SupersetItemContainer } from './SupersetItem';
// import Sets from './Sets';

export default function WorkoutDataItemContainer() {
  const item: Exercise | Superset | Section =
    React.useContext(WorkoutDataContext)!.item;
  // const deleteRootItemOverlayHandler =
  //   React.useContext(WorkoutDataContext)!.deleteRootItemOverlayHandler;

  // const mode = useWorkoutDraftStore((state) => state.mode);
  // const setExerciseIDToMod = useWorkoutDraftStore(
  //   (state) => state.setExerciseIDToMod,
  // );
  // const setSupersetIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSupersetIDToMod,
  // );
  // const setSectionIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSectionIDToMod,
  // );

  const itemType = item.type;

  // const handleDeleteItemClick = () => {
  //   if (itemType == 'exercise') {
  //     setExerciseIDToMod(item.id);
  //   } else if (itemType == 'superset') {
  //     setSupersetIDToMod(item.id);
  //   } else {
  //     setSectionIDToMod(item.id);
  //   }
  //   deleteRootItemOverlayHandler.open();
  // };

  if (itemType === 'exercise') {
    return <ExerciseItemContainer />;
  } else if (itemType === 'section') {
    return <SectionItemContainer />;
  }
  return <SupersetItemContainer />;

  // return (
  //   <WorkoutDataItem
  //     itemType={itemType}
  //     mode={mode!}
  //     handleDeleteItemClick={handleDeleteItemClick}
  //   />
  // );
}
