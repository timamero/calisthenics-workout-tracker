import { useContext } from 'react';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutDataContext } from '../../../../../../contexts/WorkoutDataContext';
import { WorkoutExerciseContext } from '../../../../../../contexts/WorkoutExerciseContextUpdated';
import ExerciseItem from './ExerciseItem';

export default function ExerciseItemContainer() {
  const exercise = useContext(WorkoutExerciseContext)?.exercise as Exercise;

  const deleteRootItemOverlayHandler =
    useContext(WorkoutDataContext)!.deleteRootItemOverlayHandler;

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
