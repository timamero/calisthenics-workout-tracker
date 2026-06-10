import { createContext, Dispatch, SetStateAction } from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";
import { AppTypeSchema } from "@cwt/schema/common";

export type WorkoutContextType = {
  appType: AppTypeSchema;

  webOverlayHandlers?: {
    deleteLogOverlayOpened?: boolean;
    deleteLogOverlayHandler?: UseDisclosureHandlers;
    deleteRootItemOverlayOpened?: boolean;
    deleteRootItemOverlayHandler?: UseDisclosureHandlers;
    deleteNestedItemOverlayOpened?: boolean;
    deleteNestedItemOverlayHandler?: UseDisclosureHandlers;
    deleteSetOverlayOpened?: boolean;
    deleteSetOverlayHandler?: UseDisclosureHandlers;
    deleteSetInSupersetOverlayOpened?: boolean;
    deleteSetInSupersetOverlayHandler?: UseDisclosureHandlers;
    saveOverlayOpened?: boolean;
    saveOverlayHandler?: UseDisclosureHandlers;
    cancelOverlayOpened?: boolean;
    cancelOverlayHandler?: UseDisclosureHandlers;
  };

  mobileOverlayHandlers?: {
    isDeleteRootItemOverlayVisible?: boolean;
    setIsDeleteRootItemOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteNestedItemOverlayVisible?: boolean;
    setIsDeleteNestedItemOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteSetOverlayVisible?: boolean;
    setIsDeleteSetOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isDeleteSetInSupersetOverlayVisible?: boolean;
    setIsDeleteSetInSupersetOverlayVisible?: Dispatch<SetStateAction<boolean>>;
    isSaveWorkoutDialogVisible?: boolean;
    setIsSaveWorkoutDialogVisible?: Dispatch<SetStateAction<boolean>>;
    isCancelWorkoutDialogVisible?: boolean;
    setIsCancelWorkoutDialogVisible?: Dispatch<SetStateAction<boolean>>;
  };
};

export const WorkoutContext = createContext<WorkoutContextType | null>(null);
