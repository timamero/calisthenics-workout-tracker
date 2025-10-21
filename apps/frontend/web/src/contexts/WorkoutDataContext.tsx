import * as React from 'react';
import { type UseDisclosureHandlers } from '@mantine/hooks';

import type { Section, Superset, Exercise } from '@cwt/schema/workouts';

interface WorkoutDataContextType {
  item: Section | Superset | Exercise;
  deleteRootItemOverlayHandler: UseDisclosureHandlers;
  deleteSetOverlayHandler: UseDisclosureHandlers;
}

export const WorkoutDataContext =
  React.createContext<WorkoutDataContextType | null>(null);
