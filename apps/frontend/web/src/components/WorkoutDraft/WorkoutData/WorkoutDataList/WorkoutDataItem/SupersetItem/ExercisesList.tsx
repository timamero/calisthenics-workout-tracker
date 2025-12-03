import { useContext } from 'react';

import type { Superset } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';

import ExerciseItem from '../ExerciseItem';

export default function ExercisesList() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext,
  )?.parentSectionID;
  const exercisesList = superset.exercises.map((exercise) => {
    return (
      <WorkoutDataItemContext.Provider
        key={exercise.id}
        value={{
          item: exercise,
          parentType: 'superset',
          parentItemsLength: superset.exercises.length,
          parentSectionID: supersetParentsSectionID
            ? supersetParentsSectionID
            : null,
          parentSupersetID: superset.id,
        }}
      >
        <ExerciseItem />
      </WorkoutDataItemContext.Provider>
    );
  });
  return <>{exercisesList}</>;
}
