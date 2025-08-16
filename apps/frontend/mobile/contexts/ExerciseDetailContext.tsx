import * as React from 'react';

import { Exercise } from '@cwt/schema/exercises';

interface ExerciseDetailContextType {
  exercise: Exercise | null;
  setExercise: React.Dispatch<React.SetStateAction<Exercise | null>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: () => void;
  hideModal: () => void;
}

export const ExerciseDetailContext =
  React.createContext<ExerciseDetailContextType | null>(null);
