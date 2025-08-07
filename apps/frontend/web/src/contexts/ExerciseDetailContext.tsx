import * as React from 'react';

import { Exercise } from '@cwt/schema/exerciseSchema';

interface ExerciseDetailContextType {
  detailExercise: Exercise;
  setDetailExercise: React.Dispatch<React.SetStateAction<Exercise>>;
}

export const ExerciseDetailContext =
  React.createContext<ExerciseDetailContextType | null>(null);
