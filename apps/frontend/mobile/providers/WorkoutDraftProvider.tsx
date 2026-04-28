import { useState, useRef, type ReactNode } from 'react';
import { ScrollView } from 'react-native';

import WorkoutDraftContext from '../contexts/WorkoutDraftContext';

export default function WorkoutDraftProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAddWorkoutItemButtonsVisible, setIsAddWorkoutItemButtonsVisible] =
    useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <WorkoutDraftContext.Provider
      value={{
        isAddWorkoutItemButtonsVisible,
        setIsAddWorkoutItemButtonsVisible,
        workoutDataScrollViewRef: scrollViewRef,
      }}
    >
      {children}
    </WorkoutDraftContext.Provider>
  );
}
