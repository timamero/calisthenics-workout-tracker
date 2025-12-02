import type { Exercise, Superset, Section } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';

import { ExerciseItemContainer } from './ExerciseItem';
import SectionItem from './SectionItem';
import SupersetItem from './SupersetItem';

interface WorkoutDataItemContainerProps {
  item: Exercise | Superset | Section;
}

export default function WorkoutDataItemContainer({
  item,
}: WorkoutDataItemContainerProps) {
  const itemType = item.type;

  if (itemType === 'exercise') {
    return (
      <WorkoutDataItemContext.Provider
        value={{
          item: item,
          parentType: null,
          parentSectionID: null,
          parentSupersetID: null,
        }}
      >
        <ExerciseItemContainer />
      </WorkoutDataItemContext.Provider>
    );
  } else if (itemType === 'section') {
    return (
      <WorkoutDataItemContext.Provider
        value={{
          item: item,
          parentType: null,
          parentSectionID: null,
          parentSupersetID: null,
        }}
      >
        <SectionItem />
      </WorkoutDataItemContext.Provider>
    );
  }
  return (
    <WorkoutDataItemContext.Provider
      value={{
        item: item,
        parentType: null,
        parentSectionID: null,
        parentSupersetID: null,
      }}
    >
      <SupersetItem />
    </WorkoutDataItemContext.Provider>
  );
}
