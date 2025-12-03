import { useContext } from 'react';
import type { Superset } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';
import { groupExercisesBySet } from '@cwt/utils';

import ExerciseSetGroupItem from './ExerciseSetGroupItem';

export default function ExerciseSetGroup() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  const exercisesGroupedBySetsList = groupExercisesBySet(superset);

  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext,
  )?.parentSectionID;

  const exercisesGroupedBySets = exercisesGroupedBySetsList.map((group) => {
    return (
      <ExerciseSetGroupItem
        key={group.setGroupNumber}
        exercisesGroupedBySets={group}
        parentSupersetID={superset.id}
        parentSectionID={supersetParentsSectionID || null}
      />
    );
  });

  return <>{exercisesGroupedBySets}</>;
}
