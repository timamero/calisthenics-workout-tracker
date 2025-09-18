import * as React from 'react';

import { WorkoutExercise } from '@cwt/schema/workouts';

interface WorkoutExerciseContextType {
  workoutExercise: WorkoutExercise;
  exerciseIndex: number;
  setIsDeleteExerciseDialogVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsDeleteSetDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkoutExerciseContext =
  React.createContext<WorkoutExerciseContextType | null>(null);
