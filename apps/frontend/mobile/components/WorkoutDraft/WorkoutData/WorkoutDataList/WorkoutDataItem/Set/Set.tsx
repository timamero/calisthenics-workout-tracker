import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import {
  // WorkoutContext,
  WorkoutDataItemContext,
  SetContext,
} from '@cwt/context';
import { useDeleteSetMobile, useToggleCompleted } from '@cwt/hooks';
import { Exercise } from '@cwt/schema/workouts';

import SetUI from './SetUI';

export default function Set() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const set = useContext(SetContext)!.set;
  const setIndex = useContext(SetContext)!.setIndex;
  const sets = exercise.sets;

  const mode = useWorkoutDraftStore((state) => state.mode);

  const handleDeleteSetPress = useDeleteSetMobile().handleDeleteSetPress;
  const handleToggleCompleted = useToggleCompleted();

  if (sets) {
    return (
      <SetUI
        mode={mode!}
        setsLength={sets.length}
        setIndex={setIndex}
        isCompleted={set.completed}
        parentType={parentType}
        handleToggleCompleted={handleToggleCompleted}
        showDeleteButton={sets.length > 1}
        onDeleteSetPress={handleDeleteSetPress}
      />
    );
  }

  // In log mode, for single set in exercise set group in superset
  return (
    <SetUI
      mode={mode!}
      setIndex={setIndex}
      isCompleted={set.completed}
      parentType={parentType}
      handleToggleCompleted={handleToggleCompleted}
      hasSupersetParentType={parentType === 'superset'}
      onDeleteSetPress={handleDeleteSetPress}
    />
  );
}
