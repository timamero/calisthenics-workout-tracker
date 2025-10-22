import * as React from 'react';
// import { type UseDisclosureHandlers } from '@mantine/hooks';

import type { Superset, Exercise } from '@cwt/schema/workouts';

interface SectionContextType {
  item: Superset | Exercise;
  // deleteNestedItemOverlayHandler: UseDisclosureHandlers;
  // deleteSetOverlayHandler: UseDisclosureHandlers;
}

export const SectionContext = React.createContext<SectionContextType | null>(
  null,
);
