import { useState, type ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

import { WorkoutContext } from "../contexts/WorkoutContext";
import { AppTypeSchema } from "@cwt/schema/common";

export default function WorkoutOverlaysContextProvider({
  appType,
  children,
}: {
  appType: AppTypeSchema;
  children: ReactNode;
}) {
  // Web
  const [addExerciseOverlayOpened, addExerciseOverlayHandler] =
    useDisclosure(false);
  const [deleteRootItemOverlayOpened, deleteRootItemOverlayHandler] =
    useDisclosure(false);
  const [deleteNestedItemOverlayOpened, deleteNestedItemOverlayHandler] =
    useDisclosure(false);
  const [deleteSetOverlayOpened, deleteSetOverlayHandler] =
    useDisclosure(false);
  const [deleteSetInSupersetOverlayOpened, deleteSetInSupersetOverlayHandler] =
    useDisclosure(false);

  const webOverlayHandlers = {
    addExerciseOverlayOpened: addExerciseOverlayOpened,
    addExerciseOverlayHandler: addExerciseOverlayHandler,
    deleteRootItemOverlayOpened: deleteRootItemOverlayOpened,
    deleteRootItemOverlayHandler: deleteRootItemOverlayHandler,
    deleteNestedItemOverlayOpened: deleteNestedItemOverlayOpened,
    deleteNestedItemOverlayHandler: deleteNestedItemOverlayHandler,
    deleteSetOverlayOpened: deleteSetOverlayOpened,
    deleteSetOverlayHandler: deleteSetOverlayHandler,
    deleteSetInSupersetOverlayOpened: deleteSetInSupersetOverlayOpened,
    deleteSetInSupersetOverlayHandler: deleteSetInSupersetOverlayHandler,
  };

  // Mobile
  const [isAddExerciseOverlayVisible, setIsAddExerciseOverlayVisible] =
    useState<boolean>(false);
  const [isDeleteRootItemOverlayVisible, setIsDeleteRootItemOverlayVisible] =
    useState<boolean>(false);
  const [
    isDeleteNestedItemOverlayVisible,
    setIsDeleteNestedItemOverlayVisible,
  ] = useState<boolean>(false);
  const [isDeleteSetOverlayVisible, setIsDeleteSetOverlayVisible] =
    useState<boolean>(false);
  const [
    isDeleteSetInSupersetOverlayVisible,
    setIsDeleteSetInSupersetOverlayVisible,
  ] = useState<boolean>(false);
  const [isAddSupersetOverlayVisible, setIsAddSupersetOverlayVisible] =
    useState<boolean>(false);
  const [isAddSectionOverlayVisible, setIsAddSectionOverlayVisible] =
    useState<boolean>(false);

  const mobileOverlayHandlers = {
    isAddExerciseOverlayVisible: isAddExerciseOverlayVisible,
    setIsAddExerciseOverlayVisible: setIsAddExerciseOverlayVisible,
    isDeleteRootItemOverlayVisible: isDeleteRootItemOverlayVisible,
    setIsDeleteRootItemOverlayVisible: setIsDeleteRootItemOverlayVisible,
    isDeleteNestedItemOverlayVisible: isDeleteNestedItemOverlayVisible,
    setIsDeleteNestedItemOverlayVisible: setIsDeleteNestedItemOverlayVisible,
    isDeleteSetOverlayVisible: isDeleteSetOverlayVisible,
    setIsDeleteSetOverlayVisible: setIsDeleteSetOverlayVisible,
    isDeleteSetInSupersetOverlayVisible: isDeleteSetInSupersetOverlayVisible,
    setIsDeleteSetInSupersetOverlayVisible:
      setIsDeleteSetInSupersetOverlayVisible,
    isAddSupersetOverlayVisible: isAddSupersetOverlayVisible,
    setIsAddSupersetOverlayVisible: setIsAddSupersetOverlayVisible,
    isAddSectionOverlayVisible: isAddSectionOverlayVisible,
    setIsAddSectionOverlayVisible: setIsAddSectionOverlayVisible,
  };

  return (
    <WorkoutContext.Provider
      value={
        appType === "web"
          ? { appType, webOverlayHandlers }
          : { appType, mobileOverlayHandlers }
      }
    >
      {children}
    </WorkoutContext.Provider>
  );
}
