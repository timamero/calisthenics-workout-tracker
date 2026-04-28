import { useState, type ReactNode } from 'react';

import WorkoutDraftContext from '../contexts/WorkoutDraftContext';

export default function WorkoutDraftProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAddWorkoutItemButtonsVisible, setIsAddWorkoutItemButtonsVisible] =
    useState<boolean>(false);

  return (
    <WorkoutDraftContext.Provider
      value={{
        isAddWorkoutItemButtonsVisible,
        setIsAddWorkoutItemButtonsVisible,
      }}
    >
      {children}
    </WorkoutDraftContext.Provider>
  );
}
