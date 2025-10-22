import { useContext } from 'react';
import type { Exercise, SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import { WorkoutDataItemContext } from '../../../../../../../contexts/WorkoutDataItemContext';
// import { WorkoutExerciseContext } from '../../../../../../../contexts/WorkoutExerciseContextUpdated';
import SetContainer from './SetContainer';

export default function SetList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;

  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const updateField = useWorkoutDraftStore((state) => state.updateFieldUpdated);

  const handleSetFieldChange = (
    setID: string,
    updatedField: Partial<SetFields>,
  ) => {
    setSetIDToMod(setID);
    updateField(null, null, exercise.id, updatedField);
  };

  const setList = exercise!.sets.map((set, i) => {
    return (
      <SetContext.Provider
        key={set.id}
        value={{
          setIndex: i,
          set: set,
          handleSetFieldChange: handleSetFieldChange,
        }}
      >
        <SetContainer />
      </SetContext.Provider>
    );
  });
  return <>{setList}</>;
}
