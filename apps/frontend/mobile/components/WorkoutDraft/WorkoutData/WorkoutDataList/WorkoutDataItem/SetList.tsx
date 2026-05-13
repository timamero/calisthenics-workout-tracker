import { useContext } from 'react';

import { Exercise } from '@cwt/schema/workouts';
import { useUpdateField } from '@cwt/hooks';
import { SetContext, WorkoutDataItemContext } from '@cwt/context';

import Set from './Set';

export default function SetList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const handleSetFieldChange = useUpdateField(
    parentSectionID,
    parentSupersetID,
  );

  const setList = exercise.sets.map((set, i) => {
    return (
      <SetContext.Provider
        key={set.id}
        value={{
          setIndex: i,
          set: set,
          handleSetFieldChange: handleSetFieldChange,
        }}
      >
        <Set key={set.id} />
      </SetContext.Provider>
    );
  });
  return <>{setList}</>;
}
