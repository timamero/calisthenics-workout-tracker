import { createContext } from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";

import { ExactlyOne } from "@cwt/schema/common";

type OverlayContextType = ExactlyOne<
  {
    addExerciseOverlayOpened?: boolean; // Web only
    isAddExerciseOverlayVisible?: boolean; // Mobile only
  },
  "addExerciseOverlayOpened" | "isAddExerciseOverlayVisible"
> &
  ExactlyOne<
    {
      addExerciseOverlayHandler?: UseDisclosureHandlers; // Web only
      setIsAddExerciseOverlayVisible?: React.Dispatch<
        React.SetStateAction<boolean>
      >; //  Mobile only
    },
    "addExerciseOverlayHandler" | "setIsAddExerciseOverlayVisible"
  >;

export const OverlayContext = createContext<OverlayContextType | null>(null);
