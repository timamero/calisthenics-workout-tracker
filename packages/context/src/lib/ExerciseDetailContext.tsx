import * as React from 'react';
import { type UseDisclosureHandlers } from '@mantine/hooks';

import type { ExerciseResponse } from '@cwt/schema/exercises';

interface ExerciseDetailContextType {
  exercise: ExerciseResponse | null;
  setExercise: React.Dispatch<React.SetStateAction<ExerciseResponse | null>>;
  opened: boolean;
  handlers: UseDisclosureHandlers;
}

export const ExerciseDetailContext =
  React.createContext<ExerciseDetailContextType | null>(null);
