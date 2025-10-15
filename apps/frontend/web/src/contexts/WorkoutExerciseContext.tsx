import * as React from 'react';
import { type UseDisclosureHandlers } from '@mantine/hooks';

import type { Exercise } from '@cwt/schema/workouts';

interface WorkoutExerciseContextType {
  workoutExercise: Exercise;
  exerciseIndex: number;
  deleteExOverlayHandler: UseDisclosureHandlers;
  deleteSetOverlayHandler: UseDisclosureHandlers;
}

export const WorkoutExerciseContext =
  React.createContext<WorkoutExerciseContextType | null>(null);
