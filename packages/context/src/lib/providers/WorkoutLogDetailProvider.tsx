import { useState, type ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

import { WorkoutLogResponse } from "@cwt/schema/workouts";
import { AppTypeSchema } from "@cwt/schema/common";

import { WorkoutLogDetailContext } from "../contexts/WorkoutLogDetailContext";

export default function WorkoutLogDetailContextProvider({
  appType,
  children,
}: {
  appType: AppTypeSchema;
  children: ReactNode;
}) {
  const [workout, setWorkout] = useState<WorkoutLogResponse | null>(null);

  // Web
  const [opened, handlers] = useDisclosure(false);
  const webOverlayHandlers = {
    opened,
    handlers,
  };

  // Mobile
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const mobileOverlayHandlers = {
    isOverlayVisible,
    setIsOverlayVisible,
  };

  return (
    <WorkoutLogDetailContext.Provider
      value={
        appType === "web"
          ? {
              appType,
              workout,
              setWorkout,
              ...webOverlayHandlers,
            }
          : { appType, workout, setWorkout, ...mobileOverlayHandlers }
      }
    >
      {children}
    </WorkoutLogDetailContext.Provider>
  );
}
