import { createContext, Dispatch, SetStateAction } from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";
import { ExactlyOne } from "@cwt/schema/common";

type WorkoutContextType = ExactlyOne<
  {
    addExerciseOverlayOpened?: boolean; // Web only
    isAddExerciseOverlayVisible?: boolean; // Mobile only
  },
  "addExerciseOverlayOpened" | "isAddExerciseOverlayVisible"
> &
  ExactlyOne<
    {
      addExerciseOverlayHandler?: UseDisclosureHandlers; // Web only
      setIsAddExerciseOverlayVisible?: Dispatch<SetStateAction<boolean>>; //  Mobile only
    },
    "addExerciseOverlayHandler" | "setIsAddExerciseOverlayVisible"
  > & {
    // Web
    deleteRootItemOverlayOpened?: boolean;
    deleteRootItemOverlayHandler?: UseDisclosureHandlers;
    deleteNestedItemOverlayOpened?: boolean;
    deleteNestedItemOverlayHandler?: UseDisclosureHandlers;
    deleteSetOverlayOpened?: boolean;
    deleteSetOverlayHandler?: UseDisclosureHandlers;
    deleteSetInSupersetOverlayOpened?: boolean;
    deleteSetInSupersetOverlayHandler?: UseDisclosureHandlers;
    addSectionOverlayOpened?: boolean;
    addSectionOverlayHandler?: UseDisclosureHandlers;

    // Mobile
    isDeleteRootItemOverlayVisible?: boolean;
    setIsDeleteRootItemOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteNestedItemOverlayVisible?: boolean;
    setIsDeleteNestedItemOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteSetOverlayVisible?: boolean;
    setIsDeleteSetOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isAddSupersetOverlayVisible?: boolean;
    setIsAddSupersetOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isAddSectionOverlayVisible?: boolean;
    setIsAddSectionOverlayVisible?: Dispatch<SetStateAction<boolean>>;
  };

export const WorkoutContext = createContext<WorkoutContextType | null>(null);
