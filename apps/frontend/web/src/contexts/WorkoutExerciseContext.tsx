import * as React from 'react';
import { type UseDisclosureHandlers } from '@mantine/hooks';

import type { WorkoutExercise } from '@cwt/schema/workouts';

interface WorkoutExerciseContextType {
  workoutExercise: WorkoutExercise;
  exerciseIndex: number;
  deleteExOverlayHandler: UseDisclosureHandlers;
  deleteSetOverlayHandler: UseDisclosureHandlers;
}

export const WorkoutExerciseContext =
  React.createContext<WorkoutExerciseContextType | null>(null);
