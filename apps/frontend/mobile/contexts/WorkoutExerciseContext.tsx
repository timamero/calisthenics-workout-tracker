import * as React from 'react';

import { Exercise } from '@cwt/schema/workouts';

interface WorkoutExerciseContextType {
  workoutExercise: Exercise;
  exerciseIndex: number;
  setIsDeleteExerciseDialogVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsDeleteSetDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkoutExerciseContext =
  React.createContext<WorkoutExerciseContextType | null>(null);
