import * as React from 'react';
import { type UseDisclosureHandlers } from '@mantine/hooks';

import type { Exercise } from '@cwt/schema/exercises';

interface ExerciseDetailContextType {
  exercise: Exercise | null;
  setExercise: React.Dispatch<React.SetStateAction<Exercise | null>>;
  opened: boolean;
  handlers: UseDisclosureHandlers;
}

export const ExerciseDetailContext =
  React.createContext<ExerciseDetailContextType | null>(null);
