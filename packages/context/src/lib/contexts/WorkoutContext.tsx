import { createContext, Dispatch, SetStateAction } from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";
import { AppTypeSchema } from "@cwt/schema/common";

export type WorkoutContextType = {
  appType: AppTypeSchema;

  webOverlayHandlers?: {
    addExerciseOverlayOpened?: boolean;
    addExerciseOverlayHandler?: UseDisclosureHandlers;
    deleteRootItemOverlayOpened?: boolean;
    deleteRootItemOverlayHandler?: UseDisclosureHandlers;
    deleteNestedItemOverlayOpened?: boolean;
    deleteNestedItemOverlayHandler?: UseDisclosureHandlers;
    deleteSetOverlayOpened?: boolean;
    deleteSetOverlayHandler?: UseDisclosureHandlers;
    deleteSetInSupersetOverlayOpened?: boolean;
    deleteSetInSupersetOverlayHandler?: UseDisclosureHandlers;
  };

  mobileOverlayHandlers?: {
    isAddExerciseOverlayVisible?: boolean;
    setIsAddExerciseOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteRootItemOverlayVisible?: boolean;
    setIsDeleteRootItemOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteNestedItemOverlayVisible?: boolean;
    setIsDeleteNestedItemOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteSetOverlayVisible?: boolean;
    setIsDeleteSetOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteSetInSuperSetOverlayVisible?: boolean;
    setIsDeleteSetInSupersetOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isAddSupersetOverlayVisible?: boolean;
    setIsAddSupersetOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isAddSectionOverlayVisible?: boolean;
    setIsAddSectionOverlayVisible?: Dispatch<SetStateAction<boolean>>;
  };
};

export const WorkoutContext = createContext<WorkoutContextType | null>(null);
