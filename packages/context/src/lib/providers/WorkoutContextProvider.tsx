import { useState, type ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';

import { WorkoutContext } from '../contexts/WorkoutContext';
import { AppTypeSchema } from '@cwt/schema/common';

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
    deleteRootItemOverlayOpened,
    deleteRootItemOverlayHandler,
    deleteNestedItemOverlayOpened,
    deleteNestedItemOverlayHandler,
    deleteSetOverlayOpened,
    deleteSetOverlayHandler,
    deleteSetInSupersetOverlayOpened,
    deleteSetInSupersetOverlayHandler,
    saveOverlayOpened,
    saveOverlayHandler,
    cancelOverlayOpened,
    cancelOverlayHandler,
  };

  // Mobile
  const [isDeleteLogOverlayVisible, setIsDeleteLogOverlayVisible] =
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
  const [isSaveWorkoutDialogVisible, setIsSaveWorkoutDialogVisible] =
    useState<boolean>(false);
  const [isCancelWorkoutDialogVisible, setIsCancelWorkoutDialogVisible] =
    useState<boolean>(false);

  const mobileOverlayHandlers = {
    isDeleteLogOverlayVisible,
    setIsDeleteLogOverlayVisible,
    isDeleteRootItemOverlayVisible,
    setIsDeleteRootItemOverlayVisible,
    isDeleteNestedItemOverlayVisible,
    setIsDeleteNestedItemOverlayVisible,
    isDeleteSetOverlayVisible,
    setIsDeleteSetOverlayVisible,
    isDeleteSetInSupersetOverlayVisible,
    setIsDeleteSetInSupersetOverlayVisible,
    isSaveWorkoutDialogVisible,
    setIsSaveWorkoutDialogVisible,
    isCancelWorkoutDialogVisible,
    setIsCancelWorkoutDialogVisible,
  };

  return (
    <WorkoutContext.Provider
      value={
        appType === 'web'
          ? { appType, webOverlayHandlers }
          : { appType, mobileOverlayHandlers }
      }
    >
      {children}
    </WorkoutContext.Provider>
  );
}
