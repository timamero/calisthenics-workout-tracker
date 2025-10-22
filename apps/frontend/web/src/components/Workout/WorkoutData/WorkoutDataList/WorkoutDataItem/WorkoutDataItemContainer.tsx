// import * as React from 'react';
// import { Stack, Text, Button, Group } from '@mantine/core';

// import { useExerciseLibraryStore } from '@cwt/state/stores';
// import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise, Superset, Section } from '@cwt/schema/workouts';

// import { WorkoutDataContext } from '../../../../../contexts/WorkoutDataContext';
import { WorkoutDataItemContext } from '../../../../../contexts/WorkoutDataItemContext';
// import { WorkoutExerciseContext } from '../../../../../contexts/WorkoutExerciseContextUpdated';
// import WorkoutDataItem from './WorkoutDataItem';
import { ExerciseItemContainer } from './ExerciseItem';
import { SectionItemContainer } from './SectionItem';
import { SupersetItemContainer } from './SupersetItem';
// import Sets from './Sets';

interface WorkoutDataItemContainerProps {
  item: Exercise | Superset | Section;
}

export default function WorkoutDataItemContainer({
  item,
}: WorkoutDataItemContainerProps) {
  // const item: Exercise | Superset | Section =
  //   React.useContext(WorkoutDataContext)!.item;
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
    return (
      <WorkoutDataItemContext.Provider value={{ item: item, parentType: null }}>
        <ExerciseItemContainer />
      </WorkoutDataItemContext.Provider>
    );
  } else if (itemType === 'section') {
    return (
      <WorkoutDataItemContext.Provider value={{ item: item, parentType: null }}>
        <SectionItemContainer />
      </WorkoutDataItemContext.Provider>
    );
  }
  return (
    <WorkoutDataItemContext.Provider value={{ item: item, parentType: null }}>
      <SupersetItemContainer />
    </WorkoutDataItemContext.Provider>
  );

  // return (
  //   <WorkoutDataItem
  //     itemType={itemType}
  //     mode={mode!}
  //     handleDeleteItemClick={handleDeleteItemClick}
  //   />
  // );
}
