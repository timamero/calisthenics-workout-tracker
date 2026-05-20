import { useSupersetState } from '@cwt/hooks';

import ExerciseSetGroupItem from './ExerciseSetGroupItem';

export default function ExerciseSetGroup() {
  const {
    supersetID,
    exercisesGroupedBySetsList,
    setsLength,
    supersetParentsSectionID,
  } = useSupersetState();

  if (!exercisesGroupedBySetsList) {
    return null;
  }

  const exercisesGroupedBySets = exercisesGroupedBySetsList.map((group) => {
    return (
      <ExerciseSetGroupItem
        key={group.setGroupNumber}
        setsLength={setsLength}
        exercisesGroupedBySets={group}
        parentSupersetID={supersetID}
        parentSectionID={supersetParentsSectionID || null}
      />
    );
  });

  return <>{exercisesGroupedBySets}</>;
}
