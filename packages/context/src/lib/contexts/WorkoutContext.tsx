import * as React from "react";
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
      setIsAddExerciseOverlayVisible?: React.Dispatch<
        React.SetStateAction<boolean>
      >; //  Mobile only
    },
    "addExerciseOverlayHandler" | "setIsAddExerciseOverlayVisible"
  > & {
    // Web
    // addExerciseOverlayHandler?: UseDisclosureHandlers;
    deleteRootItemOverlayOpened?: boolean;
    deleteRootItemOverlayHandler?: UseDisclosureHandlers;
    deleteNestedItemOverlayOpened?: boolean;
    deleteNestedItemOverlayHandler?: UseDisclosureHandlers;
    deleteSetOverlayOpened?: boolean;
    deleteSetOverlayHandler?: UseDisclosureHandlers;
    addSupersetOverlayOpened?: boolean;
    addSupersetOverlayHandler?: UseDisclosureHandlers;
    addSectionOverlayOpened?: boolean;
    addSectionOverlayHandler?: UseDisclosureHandlers;

    // Mobile
    // setIsAddExerciseDialogVisible?: React.Dispatch<
    //   React.SetStateAction<boolean>
    // >;
    isDeleteRootItemOverlayVisible?: boolean;
    setIsDeleteRootItemOverlayVisible?: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    isDeleteNestedItemOverlayVisible?: boolean;
    setIsDeleteNestedItemOverlayVisible?: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    isDeleteSetOverlayVisible?: boolean;
    setIsDeleteSetOverlayVisible?: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    isAddSupersetOverlayVisible?: boolean;
    setIsAddSupersetOverlayVisible?: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    isAddSectionOverlayVisible?: boolean;
    setIsAddSectionOverlayVisible?: React.Dispatch<
      React.SetStateAction<boolean>
    >;
  };

// interface WorkoutContextType {
//   // Web
//   addExerciseOverlayHandler?: UseDisclosureHandlers;
//   deleteRootItemOverlayHandler?: UseDisclosureHandlers;
//   deleteNestedItemOverlayHandler?: UseDisclosureHandlers;
//   deleteSetOverlayHandler?: UseDisclosureHandlers;
//   addSupersetOverlayHandler?: UseDisclosureHandlers;

//   // Mobile
//   setIsAddExerciseDialogVisible?: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsDeleteRootItemDialogVisible?: React.Dispatch<
//     React.SetStateAction<boolean>
//   >;
//   setIsDeleteNestedItemDialogVisible?: React.Dispatch<
//     React.SetStateAction<boolean>
//   >;
//   setIsDeleteSetDialogVisible?: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsAddSupersetDialogVisible?: React.Dispatch<React.SetStateAction<boolean>>;
//   // setIsDeleteExerciseDialogVisible?: React.Dispatch<
//   //   React.SetStateAction<boolean>
//   // >; // will be superseded
// }

export const WorkoutContext = React.createContext<WorkoutContextType | null>(
  null
);
