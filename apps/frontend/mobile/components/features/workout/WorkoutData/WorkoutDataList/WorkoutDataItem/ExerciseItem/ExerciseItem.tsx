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

import ExerciseItemUI from './ExerciseItemUI';

export default function ExerciseItem() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  const parentLength = useContext(WorkoutDataItemContext)?.parentItemsLength;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const name = getExerciseNameById(exercise!.exercise_id);

  const handleAddSetPress = useAddSetMobile().handleAddSetPress;

  const { handleUpPress, handleDownPress } = useReorderItemMobile(exercise);

  const handleDeleteExercisePress = useDeleteItemMobile(
    'exercise',
    exercise.id,
  ).handleDeleteItemPress;

  const useParentItemsLength = () => {
    if (!parentSectionID && !parentSupersetID) {
      return rootWorkoutDataLength;
    }
    return parentLength ? parentLength : 0;
  };

  return (
    <ExerciseItemUI
      mode={mode!}
      name={name}
      isFirst={exercise!.order === 0}
      isLast={exercise!.order === useParentItemsLength() - 1}
      parentType={parentType}
      parentItemsLength={parentLength}
      handleUpPress={handleUpPress}
      handleDownPress={handleDownPress}
      handleAddSetPress={handleAddSetPress}
      handleDeleteExercisePress={handleDeleteExercisePress}
    />
  );
}
