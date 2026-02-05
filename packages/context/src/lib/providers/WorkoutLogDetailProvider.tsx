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

  const [opened, handlers] = useDisclosure(false);

  return (
    <WorkoutLogDetailContext.Provider
      value={{
        workout,
        setWorkout,
        opened,
        handlers,
      }}
    >
      {children}
    </WorkoutLogDetailContext.Provider>
  );
}
