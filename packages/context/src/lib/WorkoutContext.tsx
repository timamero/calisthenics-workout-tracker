import * as React from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";

interface WorkoutContextType {
  // Web
  addExerciseOverlayHandler?: UseDisclosureHandlers;
  deleteRootItemOverlayHandler?: UseDisclosureHandlers;
  deleteNestedItemOverlayHandler?: UseDisclosureHandlers;
  deleteSetOverlayHandler?: UseDisclosureHandlers;
  addSupersetOverlayHandler?: UseDisclosureHandlers;

  // Mobile
  setIsAddExerciseDialogVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteRootItemDialogVisible?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsDeleteNestedItemDialogVisible?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsDeleteSetDialogVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddSupersetDialogVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteExerciseDialogVisible?: React.Dispatch<
    React.SetStateAction<boolean>
  >; // will be superseded
}

export const WorkoutContext = React.createContext<WorkoutContextType | null>(
  null
);
