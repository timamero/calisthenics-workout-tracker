import { useContext } from "react";
import { WorkoutLogDetailContext } from "@cwt/context";

export function useWorkoutLogDetailContext() {
  const context = useContext(WorkoutLogDetailContext);
  if (!context) {
    throw new Error(
      "useWorkoutLogDetailContext must be used within WorkoutContextProvider",
    );
  }

  return context;
}

export function useWorkoutLogDetailContextWeb() {
  const context = useWorkoutLogDetailContext();
  if (!context.webOverlayHandlers) {
    throw new Error(
      "useWorkoutLogDetailContextWeb must be used in web app with webOverlayHandlers provided",
    );
  }

  return {
    workout: context.workout,
    setWorkout: context.setWorkout,
    webOverlayHandlers: context.webOverlayHandlers,
  };
}

export function useWorkoutLogDetailContextMobile() {
  const context = useWorkoutLogDetailContext();
  if (!context.mobileOverlayHandlers) {
    throw new Error(
      "useWorkoutLogDetailContextMobile must be used in web app with mobileOverlayHandlers provided",
    );
  }

  return {
    workout: context.workout,
    setWorkout: context.setWorkout,
    mobileOverlayHandlers: context.mobileOverlayHandlers,
  };
}
