import { useSupersetState } from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import { ExerciseItemContainer } from '../ExerciseItem';

export default function ExercisesList() {
  const {
    supersetID,
    exercises,
    supersetItemsLength,
    supersetParentsSectionID,
  } = useSupersetState();

  const exercisesList = exercises.map((exercise) => {
    return (
      <WorkoutDataItemContext.Provider
        key={exercise.id}
        value={{
          item: exercise,
          parentType: 'superset',
          parentItemsLength: supersetItemsLength,
          parentSectionID: supersetParentsSectionID
            ? supersetParentsSectionID
            : null,
          parentSupersetID: supersetID,
        }}
      >
        <ExerciseItemContainer />
      </WorkoutDataItemContext.Provider>
    );
  });
  return <>{exercisesList}</>;
}
