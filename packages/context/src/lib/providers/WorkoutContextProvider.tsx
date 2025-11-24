import { useState, type ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

import { WorkoutContext } from "../contexts/WorkoutContext";
import { AppTypeSchema } from "@cwt/schema/common";

export default function WorkoutContextProvider({
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
  const [addSectionOverlayOpened, addSectionOverlayHandler] =
    useDisclosure(false);
  const [addSupersetOverlayOpened, addSupersetOverlayHandler] =
    useDisclosure(false);

  const webValue = {
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
    addSectionOverlayOpened: addSectionOverlayOpened,
    addSectionOverlayHandler: addSectionOverlayHandler,
    addSupersetOverlayOpened: addSupersetOverlayOpened,
    addSupersetOverlayHandler: addSupersetOverlayHandler,
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
  const [isAddSupersetOverlayVisible, setIsAddSupersetOverlayVisible] =
    useState<boolean>(false);
  const [isAddSectionOverlayVisible, setIsAddSectionOverlayVisible] =
    useState<boolean>(false);

  const mobileValue = {
    isAddExerciseOverlayVisible: isAddExerciseOverlayVisible,
    setIsAddExerciseOverlayVisible: setIsAddExerciseOverlayVisible,
    isDeleteRootItemOverlayVisible: isDeleteRootItemOverlayVisible,
    setIsDeleteRootItemOverlayVisible: setIsDeleteRootItemOverlayVisible,
    isDeleteNestedItemOverlayVisible: isDeleteNestedItemOverlayVisible,
    setIsDeleteNestedItemOverlayVisible: setIsDeleteNestedItemOverlayVisible,
    isDeleteSetOverlayVisible: isDeleteSetOverlayVisible,
    setIsDeleteSetOverlayVisible: setIsDeleteSetOverlayVisible,
    isAddSupersetOverlayVisible: isAddSupersetOverlayVisible,
    setIsAddSupersetOverlayVisible: setIsAddSupersetOverlayVisible,
    isAddSectionOverlayVisible: isAddSectionOverlayVisible,
    setIsAddSectionOverlayVisible: setIsAddSectionOverlayVisible,
  };

  return (
    <WorkoutContext.Provider value={appType === "web" ? webValue : mobileValue}>
      {children}
    </WorkoutContext.Provider>
  );
}
