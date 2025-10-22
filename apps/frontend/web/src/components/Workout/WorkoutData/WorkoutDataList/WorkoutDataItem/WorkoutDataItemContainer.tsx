import type { Exercise, Superset, Section } from '@cwt/schema/workouts';

import { WorkoutDataItemContext } from '../../../../../contexts/WorkoutDataItemContext';
import { ExerciseItemContainer } from './ExerciseItem';
import { SectionItemContainer } from './SectionItem';
import { SupersetItemContainer } from './SupersetItem';

interface WorkoutDataItemContainerProps {
  item: Exercise | Superset | Section;
}

export default function WorkoutDataItemContainer({
  item,
}: WorkoutDataItemContainerProps) {
  const itemType = item.type;

  if (itemType === 'exercise') {
    return (
      <WorkoutDataItemContext.Provider value={{ item: item, parentType: null }}>
        <ExerciseItemContainer />
      </WorkoutDataItemContext.Provider>
    );
  } else if (itemType === 'section') {
    return (
      <WorkoutDataItemContext.Provider value={{ item: item, parentType: null }}>
        <SectionItemContainer />
      </WorkoutDataItemContext.Provider>
    );
  }
  return (
    <WorkoutDataItemContext.Provider value={{ item: item, parentType: null }}>
      <SupersetItemContainer />
    </WorkoutDataItemContext.Provider>
  );
}
