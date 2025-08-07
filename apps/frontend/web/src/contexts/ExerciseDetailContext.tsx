import * as React from 'react';
import {
  type UseDisclosureHandlers,
  // type UseDisclosureOptions,
} from '@mantine/hooks';

import { Exercise } from '@cwt/schema/exerciseSchema';

interface ExerciseDetailContextType {
  exercise: Exercise;
  setExercise: React.Dispatch<React.SetStateAction<Exercise>>;
  opened: boolean;
  handlers: UseDisclosureHandlers;
}

export const ExerciseDetailContext =
  React.createContext<ExerciseDetailContextType | null>(null);
