import * as React from 'react';
import { type UseDisclosureHandlers } from '@mantine/hooks';

import type { Exercise } from '@cwt/schema/workouts';

interface WorkoutDataContextType {
  exercise: Exercise;
  sectionID: string | null;
  suspersetID: string | null;
  exerciseID: string | null;
  setID: string | null;
  deleteExOverlayHandler: UseDisclosureHandlers;
  deleteSetOverlayHandler: UseDisclosureHandlers;
}

export const WorkoutExerciseContext =
  React.createContext<WorkoutDataContextType | null>(null);
