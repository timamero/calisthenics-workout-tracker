import { useContext } from 'react';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import ExerciseItem from './ExerciseItem';

export default function ExerciseItemContainer() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;

  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)!.deleteRootItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const addSet = useWorkoutDraftStore((state) => state.addSetUpdated);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );

  const name = getExerciseNameById(exercise!.exercise_id);

  const handleDeleteExerciseClick = () => {
    setExerciseIDToMod(exercise!.id);
    deleteRootItemOverlayHandler.open();
  };

  return (
    <ExerciseItem
      mode={mode!}
      name={name}
      exerciseID={exercise!.id}
      handleAddSetClick={addSet}
      handleDeleteExerciseClick={handleDeleteExerciseClick}
    />
  );
}
