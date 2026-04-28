import { createContext, Dispatch, SetStateAction } from 'react';

interface WorkoutDraftContextType {
  isAddWorkoutItemButtonsVisible: boolean;
  setIsAddWorkoutItemButtonsVisible: Dispatch<SetStateAction<boolean>>;
}

const WorkoutDraftContext = createContext<WorkoutDraftContextType | null>(null);

export default WorkoutDraftContext;
