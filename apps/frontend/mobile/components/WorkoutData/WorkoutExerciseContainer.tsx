import type { WorkoutExercise as WorkoutExerciseType } from '@cwt/schema/workouts';
import {
  useExerciseLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

import WorkoutExercise from './WorkoutExercise';

interface WorkoutExerciseProps {
  exerciseIndex: number;
  workoutExercise: WorkoutExerciseType;
  handleOpenDialog: () => void;
  handleDeleteSetDialog: () => void;
}

export default function WorkoutExerciseContainer({
  exerciseIndex,
  workoutExercise,
  handleOpenDialog,
  handleDeleteSetDialog,
}: WorkoutExerciseProps) {
  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const setSelectedExerciseIndexToDel = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(workoutExercise.exercise_id);

  const handleDeleteExercisePress = () => {
    setSelectedExerciseIndexToDel(exerciseIndex);
    handleOpenDialog();
  };

  return (
    <WorkoutExercise
      name={name}
      exerciseIndex={exerciseIndex}
      handleAddSet={addSet}
      handleDeleteExercisePress={handleDeleteExercisePress}
      handleDeleteSetDialog={handleDeleteSetDialog}
    />
  );
}
