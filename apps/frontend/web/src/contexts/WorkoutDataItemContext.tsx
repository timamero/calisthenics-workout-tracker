import * as React from 'react';

import type { Exercise, Superset, Section } from '@cwt/schema/workouts';

interface WorkoutDataItemContextType {
  item: Exercise | Superset | Section;
  parentType: 'section' | 'superset' | null;
}

export const WorkoutDataItemContext =
  React.createContext<WorkoutDataItemContextType | null>(null);
