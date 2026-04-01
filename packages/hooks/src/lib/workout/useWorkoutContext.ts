import { useContext } from "react";
import { WorkoutContext } from "@cwt/context";

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error(
      "useWorkoutContext must be used within WorkoutContextProvider",
    );
  }

  return context;
}

export function useWorkoutContextWeb() {
  const context = useWorkoutContext();
  if (!context.webOverlayHandlers) {
    throw new Error(
      "useWorkoutContextWeb must be used in web app with webOverlayHandlers provided",
    );
  }

  return {
    webOverlayHandlers: context.webOverlayHandlers,
  };
}

export function useWorkoutContextMobile() {
  const context = useWorkoutContext();
  if (!context.mobileOverlayHandlers) {
    throw new Error(
      "useWorkoutContextMobile must be used in mobile app with mobileOverlayHandlers provided",
    );
  }

  return {
    mobileOverlayHandlers: context.mobileOverlayHandlers,
  };
}
