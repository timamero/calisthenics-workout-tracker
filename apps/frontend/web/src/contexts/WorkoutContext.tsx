import * as React from 'react';
import { type UseDisclosureHandlers } from '@mantine/hooks';

interface WorkoutContextType {
  addExerciseOverlayHandler: UseDisclosureHandlers;
  deleteRootItemOverlayHandler: UseDisclosureHandlers;
  deleteNestedItemOverlayHandler: UseDisclosureHandlers;
  deleteSetOverlayHandler: UseDisclosureHandlers;
  addSupersetOverlayHandler: UseDisclosureHandlers;
}

export const WorkoutContext = React.createContext<WorkoutContextType | null>(
  null,
);
