import { createContext } from 'react';
import { type UseDisclosureHandlers } from '@mantine/hooks';

interface WorkoutDraftContextType {
  exerciseFilterOverlayOpened: boolean;
  exerciseFilterOverlayHandler: UseDisclosureHandlers;
}

const WorkoutDraftContext = createContext<WorkoutDraftContextType | null>(null);

export default WorkoutDraftContext;
