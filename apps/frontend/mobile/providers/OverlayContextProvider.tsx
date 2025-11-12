import { useState, type ReactNode } from 'react';

import { OverlayContext } from '@cwt/context';

export default function OverlayContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAddExerciseOverlayVisible, setIsAddExerciseOverlayVisible] =
    useState<boolean>(false);

  const value = {
    isAddExerciseOverlayVisible: isAddExerciseOverlayVisible,
    setIsAddExerciseOverlayVisible: setIsAddExerciseOverlayVisible,
  };
  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
}
