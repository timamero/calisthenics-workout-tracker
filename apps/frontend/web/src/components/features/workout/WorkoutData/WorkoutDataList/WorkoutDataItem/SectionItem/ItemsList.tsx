import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';

import ExerciseItem from '../ExerciseItem';
import SupersetItem from '../SupersetItem';

export default function ItemsList() {
  const section = useContext(WorkoutDataItemContext)!.item as Section;
  const itemsList = section.items.map((item) => {
    if (item.type === 'exercise') {
      return (
        <WorkoutDataItemContext.Provider
          key={item.id}
          value={{
            item: item,
            parentType: 'section',
            parentItemsLength: section.items.length,
            parentSectionID: section.id,
            parentSupersetID: null,
          }}
        >
          <ExerciseItem />
        </WorkoutDataItemContext.Provider>
      );
    }
    return (
      <WorkoutDataItemContext.Provider
        key={item.id}
        value={{
          item: item,
          parentType: 'section',
          parentItemsLength: section.items.length,
          parentSectionID: section.id,
          parentSupersetID: null,
        }}
      >
        <SupersetItem />
      </WorkoutDataItemContext.Provider>
    );
  });

  return <>{itemsList}</>;
}
