import { type ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';

import { OverlayContext } from '@cwt/context';

export default function OverlayContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [addExerciseOverlayOpened, addExerciseOverlayHandler] =
    useDisclosure(false);

  const value = {
    addExerciseOverlayOpened: addExerciseOverlayOpened,
    addExerciseOverlayHandler: addExerciseOverlayHandler,
  };
  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
}
