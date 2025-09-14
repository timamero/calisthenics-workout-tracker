import * as React from 'react';

import { ExerciseResponse } from '@cwt/schema/exercises';

interface ExerciseDetailContextType {
  exercise: ExerciseResponse | null;
  setExercise: React.Dispatch<React.SetStateAction<ExerciseResponse | null>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: () => void;
  hideModal: () => void;
}

export const ExerciseDetailContext =
  React.createContext<ExerciseDetailContextType | null>(null);
