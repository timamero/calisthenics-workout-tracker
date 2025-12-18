import { useSupersetState } from '@cwt/hooks';

export default function ExerciseSetGroup() {
  const { supersetID, exercisesGroupedBySetsList, supersetParentsSectionID } =
    useSupersetState();

  const exercisesGroupedBySets = exercisesGroupedBySetsList.map((group) => {
    return <div key={group.setGroupNumber}></div>;
  });

  return <>{exercisesGroupedBySets}</>;
}
