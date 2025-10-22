import * as React from 'react';
import type { Exercise, SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
// import { WorkoutDataContext } from '../../../../../../../contexts/WorkoutDataContext';
import { WorkoutExerciseContext } from '../../../../../../../contexts/WorkoutExerciseContextUpdated';
// import { SectionContext } from '../../../../../../../contexts/SectionContext';
import SetContainer from './SetContainer';

// interface SetListProps {
//   exerciseID: string;
// }

export default function SetList() {
  const exercise = React.useContext(WorkoutExerciseContext)
    ?.exercise as Exercise;

  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  // const setSelectedSetIndexToMod = useWorkoutDraftStore(
  //   (state) => state.setSelectedSetIndexToMod,
  // );
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
