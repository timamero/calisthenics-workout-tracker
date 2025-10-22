import { useContext } from 'react';
import type { Exercise, SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import { WorkoutDataItemContext } from '../../../../../../../contexts/WorkoutDataItemContext';
import SetContainer from './SetContainer';

export default function SetList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const updateField = useWorkoutDraftStore((state) => state.updateFieldUpdated);

  const handleSetFieldChange = (
    setID: string,
    updatedField: Partial<SetFields>,
  ) => {
    setSetIDToMod(setID);
    setExerciseIDToMod(exercise.id);
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
    updateField(updatedField);
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
