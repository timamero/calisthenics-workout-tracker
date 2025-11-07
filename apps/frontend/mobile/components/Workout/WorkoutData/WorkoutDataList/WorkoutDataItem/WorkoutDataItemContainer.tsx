import type { Exercise, Superset, Section } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';

// import { ExerciseItemContainer } from './ExerciseItem';
// import { SectionItemContainer } from './SectionItem';
// import { SupersetItemContainer } from './SupersetItem';

import { Text } from '../../../../../customText';

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
        <Text style={{ color: 'white' }}>Exercise item</Text>
        {/* <ExerciseItemContainer /> */}
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
        <Text style={{ color: 'white' }}>Section item</Text>
        {/* <SectionItemContainer /> */}
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
      <Text style={{ color: 'white' }}>Superset item</Text>
      {/* <SupersetItemContainer /> */}
    </WorkoutDataItemContext.Provider>
  );
}
