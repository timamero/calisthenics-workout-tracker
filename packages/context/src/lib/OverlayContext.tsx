import { createContext } from "react";

interface OverlayContextType {
  isAddExerciseOverlayVisible?: boolean;
  setIsAddExerciseOverlayVisible?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const OverlayContext = createContext<OverlayContextType | null>(null);
