import * as React from 'react';

import type { Exercise, Superset, Section } from '@cwt/schema/workouts';

interface WorkoutDataItemContextType {
  item: Exercise | Superset | Section;
  parentType: 'section' | 'superset' | null;
  // Add parentSectionID and parentSupersetID
}

export const WorkoutDataItemContext =
  React.createContext<WorkoutDataItemContextType | null>(null);
