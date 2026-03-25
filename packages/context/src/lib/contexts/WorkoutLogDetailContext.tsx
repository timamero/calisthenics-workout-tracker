import { createContext, Dispatch, SetStateAction } from "react";
import { type UseDisclosureHandlers } from "@mantine/hooks";
import { WorkoutLogResponse } from "@cwt/schema/workouts";
import { AppTypeSchema } from "@cwt/schema/common";

export type WorkoutLogDetailContextType = {
  appType: AppTypeSchema;
  workout: WorkoutLogResponse | null;
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutLogResponse | null>>;

  webOverlayHandlers?: {
    opened?: boolean;
    handlers?: UseDisclosureHandlers;
  };

  mobileOverlayHandlers?: {
    isOverlayVisible?: boolean;
    setIsOverlayVisible?: Dispatch<SetStateAction<boolean>>;
  };
};

export const WorkoutLogDetailContext =
  createContext<WorkoutLogDetailContextType | null>(null);
