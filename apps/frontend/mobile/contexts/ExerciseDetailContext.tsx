import * as React from 'react';

import { Exercise } from '@cwt/schema/exerciseSchema';

interface ExerciseDetailContextType {
  exercise: Exercise;
  setExercise: React.Dispatch<React.SetStateAction<Exercise>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: () => void;
  hideModal: () => void;
}

export const ExerciseDetailContext =
  React.createContext<ExerciseDetailContextType | null>(null);
