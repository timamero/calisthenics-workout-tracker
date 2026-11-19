import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';
import { SetContext } from '@cwt/context';
import { useDeleteSet, useToggleCompleted } from '@cwt/hooks';

import SetUI from './SetUI';

export default function Set() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;

  const set = useContext(SetContext)!.set;
  const setIndex = useContext(SetContext)!.setIndex;

  const sets = exercise.sets;

  const mode = useWorkoutDraftStore((state) => state.mode);

  const { handleDeleteSetClick } = useDeleteSet();
  const handleToggleCompleted = useToggleCompleted();

  if (sets) {
    return (
      <SetUI
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
  // In log mode, for single set in exercise set group in superset
  return (
    <SetUI
      mode={mode!}
      setIndex={setIndex}
      isCompleted={set.completed}
      handleToggleCompleted={handleToggleCompleted}
      hasSupersetParentType={true}
      handleDeleteSetClick={handleDeleteSetClick}
    />
  );
}
