import { createContext } from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";

interface OverlayContextType {
  addExerciseOverlayOpened?: boolean; // Web only
  isAddExerciseOverlayVisible?: boolean; // Mobile only

  addExerciseOverlayHandler?: UseDisclosureHandlers; // Web only
  setIsAddExerciseOverlayVisible?: React.Dispatch<
    React.SetStateAction<boolean>
  >; // Mobile only
}

export const OverlayContext = createContext<OverlayContextType | null>(null);
