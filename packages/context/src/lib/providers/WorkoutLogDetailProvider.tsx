import { useState, type ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

import { WorkoutLogResponse } from "@cwt/schema/workouts";

import { WorkoutLogDetailContext } from "../contexts/WorkoutLogDetailContext";

export default function WorkoutLogDetailContextProvider({
  children,
}: {
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
      value={{
        workout,
        setWorkout,
        webOverlayHandlers,
        mobileOverlayHandlers,
      }}
    >
      {children}
    </WorkoutLogDetailContext.Provider>
  );
}
