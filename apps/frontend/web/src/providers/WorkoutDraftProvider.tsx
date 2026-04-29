import { type ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';

import WorkoutDraftContext from '../contexts/WorkoutDraftContext';

export default function WorkoutDraftProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [exerciseFilterOverlayOpened, exerciseFilterOverlayHandler] =
    useDisclosure(false);

  return (
    <WorkoutDraftContext.Provider
      value={{
        exerciseFilterOverlayOpened,
        exerciseFilterOverlayHandler,
      }}
    >
      {children}
    </WorkoutDraftContext.Provider>
  );
}
