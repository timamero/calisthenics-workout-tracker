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
  const [deleteLogOverlayOpened, deleteLogOverlayHandler] =
    useDisclosure(false);
  const [deleteRootItemOverlayOpened, deleteRootItemOverlayHandler] =
    useDisclosure(false);
  const [deleteNestedItemOverlayOpened, deleteNestedItemOverlayHandler] =
    useDisclosure(false);
  const [deleteSetOverlayOpened, deleteSetOverlayHandler] =
    useDisclosure(false);
  const [deleteSetInSupersetOverlayOpened, deleteSetInSupersetOverlayHandler] =
    useDisclosure(false);
  const [saveOverlayOpened, saveOverlayHandler] = useDisclosure(false);
  const [cancelOverlayOpened, cancelOverlayHandler] = useDisclosure(false);

  const webOverlayHandlers = {
    deleteLogOverlayOpened,
    deleteLogOverlayHandler,
    deleteRootItemOverlayOpened: deleteRootItemOverlayOpened,
    deleteRootItemOverlayHandler: deleteRootItemOverlayHandler,
    deleteNestedItemOverlayOpened: deleteNestedItemOverlayOpened,
    deleteNestedItemOverlayHandler: deleteNestedItemOverlayHandler,
    deleteSetOverlayOpened: deleteSetOverlayOpened,
    deleteSetOverlayHandler: deleteSetOverlayHandler,
    deleteSetInSupersetOverlayOpened: deleteSetInSupersetOverlayOpened,
    deleteSetInSupersetOverlayHandler: deleteSetInSupersetOverlayHandler,
    saveOverlayOpened: saveOverlayOpened,
    saveOverlayHandler: saveOverlayHandler,
    cancelOverlayOpened: cancelOverlayOpened,
    cancelOverlayHandler: cancelOverlayHandler,
  };

  // Mobile
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
  const [isSaveWorkoutDialogVisible, setIsSaveWorkoutDialogVisible] =
    useState<boolean>(false);
  const [isCancelWorkoutDialogVisible, setIsCancelWorkoutDialogVisible] =
    useState<boolean>(false);

  const mobileOverlayHandlers = {
    isDeleteRootItemOverlayVisible: isDeleteRootItemOverlayVisible,
    setIsDeleteRootItemOverlayVisible: setIsDeleteRootItemOverlayVisible,
    isDeleteNestedItemOverlayVisible: isDeleteNestedItemOverlayVisible,
    setIsDeleteNestedItemOverlayVisible: setIsDeleteNestedItemOverlayVisible,
    isDeleteSetOverlayVisible: isDeleteSetOverlayVisible,
    setIsDeleteSetOverlayVisible: setIsDeleteSetOverlayVisible,
    isDeleteSetInSupersetOverlayVisible: isDeleteSetInSupersetOverlayVisible,
    setIsDeleteSetInSupersetOverlayVisible:
      setIsDeleteSetInSupersetOverlayVisible,
    isSaveWorkoutDialogVisible,
    setIsSaveWorkoutDialogVisible,
    isCancelWorkoutDialogVisible,
    setIsCancelWorkoutDialogVisible,
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
