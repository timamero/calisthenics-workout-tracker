import { useContext } from 'react';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';
import {
  useDeleteItem,
  useParentItemsLength,
  useReorderItem,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import ExerciseItem from './ExerciseItem';

export default function ExerciseItemContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const addSetToSuperset = useWorkoutDraftStore(
    (state) => state.addSetToSuperset,
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

  const handleUpClick = useReorderItem(exercise).handleUpClick;
  const handleDownClick = useReorderItem(exercise).handleDownClick;
  const handleDeleteExerciseClick = useDeleteItem(
    'exercise',
    exercise!.id,
  ).handleDeleteItemClick;

  const name = getExerciseNameById(exercise!.exercise_id);

  const handleAddSetClick = () => {
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentType === 'superset') {
      addSetToSuperset();
    } else {
      setExerciseIDToMod(exercise!.id);
      addSet();
    }
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
