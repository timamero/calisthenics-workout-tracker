import { createContext } from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";
import { WorkoutLogResponse } from "@cwt/schema/workouts";

export type WorkoutLogDetailContextType = {
  workout: WorkoutLogResponse | null;
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutLogResponse | null>>;
  opened: boolean;
  handlers: UseDisclosureHandlers;
};

export const WorkoutLogDetailContext =
  createContext<WorkoutLogDetailContextType | null>(null);
