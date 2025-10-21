import * as React from 'react';
import type { Exercise, SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import { WorkoutDataContext } from '../../../../../../../contexts/WorkoutDataContext';
import SetContainer from './SetContainer';

// interface SetListProps {
//   exerciseID: string;
// }

export default function SetList() {
  // const exercise = useWorkoutDraftStore(
  //   (state) => state.workoutData[exerciseIndex],
  // ) as Exercise;
  const exercise = React.useContext(WorkoutDataContext)?.item as Exercise;

  const sets = exercise.sets;

  const setSetIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  // const setSelectedSetIndexToMod = useWorkoutDraftStore(
  //   (state) => state.setSelectedSetIndexToMod,
  // );
  const updateField = useWorkoutDraftStore((state) => state.updateFieldUpdated);

  const handleSetFieldChange = (
    setID: string,
    updatedField: Partial<SetFields>,
  ) => {
    setSetIDToMod(setID);
    // setSelectedSetIndexToMod(setIndex);
    updateField(null, null, exercise.id, updatedField);
  };

  const setList = sets.map((set, i) => {
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
