import * as React from 'react';

import { Exercise } from '@cwt/schema/exerciseSchema';

interface ExerciseDetailContextType {
  exercise: Exercise;
  setDetailExercise: React.Dispatch<React.SetStateAction<Exercise>>;
}

export const ExerciseDetailContext =
  React.createContext<ExerciseDetailContextType | null>(null);
