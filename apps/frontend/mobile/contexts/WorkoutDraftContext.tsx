import { createContext, Dispatch, SetStateAction, RefObject } from 'react';
import { ScrollView } from 'react-native';

interface WorkoutDraftContextType {
  isAddWorkoutItemButtonsVisible: boolean;
  setIsAddWorkoutItemButtonsVisible: Dispatch<SetStateAction<boolean>>;

  isExerciseFilterVisible: boolean;
  setIsExerciseFilterVisible: Dispatch<SetStateAction<boolean>>;

  workoutDataScrollViewRef?: RefObject<ScrollView | null>;
}

const WorkoutDraftContext = createContext<WorkoutDraftContextType | null>(null);

export default WorkoutDraftContext;
