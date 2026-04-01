import { useContext } from 'react';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';
import {
  useDeleteItem,
  useParentItemsLength,
  useReorderItem,
  useAddSet,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import ExerciseItemUI from './ExerciseItemUI';

export default function ExerciseItem() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const handleUpClick = useReorderItem(exercise).handleUpClick;
  const handleDownClick = useReorderItem(exercise).handleDownClick;
  const handleDeleteExerciseClick = useDeleteItem(
    'exercise',
    exercise!.id,
  ).handleDeleteItemClick;
  const { handleAddSetClick } = useAddSet();

  const name = getExerciseNameById(exercise!.exercise_id);

  return (
    <ExerciseItemUI
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
