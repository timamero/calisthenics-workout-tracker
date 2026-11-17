import { useContext } from 'react';
import type { Exercise } from '@cwt/schema/workouts';

import { SetContext } from '@cwt/context';
import { WorkoutDataItemContext } from '@cwt/context';
import { useUpdateField } from '@cwt/hooks';

import Set from './Set';

export default function SetList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const handleSetFieldChange = useUpdateField(
    parentSectionID,
    parentSupersetID,
  );

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
        <Set />
      </SetContext.Provider>
    );
  });
  return <>{setList}</>;
}
