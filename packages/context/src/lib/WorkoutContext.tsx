import * as React from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";

interface WorkoutContextType {
  // Web
  deleteRootItemOverlayHandler?: UseDisclosureHandlers;
  deleteNestedItemOverlayHandler?: UseDisclosureHandlers;
  deleteSetOverlayHandler?: UseDisclosureHandlers;
  addSupersetOverlayHandler?: UseDisclosureHandlers;

  // Mobile
  setIsDeleteRootItemDialogVisible?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsDeleteNestedItemDialogVisible?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsDeleteSetDialogVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddSupersetDialogVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkoutContext = React.createContext<WorkoutContextType | null>(
  null,
);
