import * as React from 'react';

import type { Exercise } from '@cwt/schema/workouts';

interface WorkoutExerciseContextType {
  exercise: Exercise;
  parentType: 'section' | 'superset' | null;
}

export const WorkoutExerciseContext =
  React.createContext<WorkoutExerciseContextType | null>(null);
