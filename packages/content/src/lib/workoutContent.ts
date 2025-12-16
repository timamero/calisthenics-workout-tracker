import { Mode } from "@cwt/schema/workouts";

export const emptyWorkoutPlaceholderContent = (mode: Mode) => {
  return {
    heading: `Ready to start ${mode === "build" ? "building" : "logging"} your workout?`,
    message: "Add your first exercise to begin",
  };
};

export const saveWorkoutConfirmationContent = (mode: Mode) => {
  return {
    title: `Save Workout ${mode === "build" ? "Template" : ""}`,
    message: `Complete and save this ${mode === "build" ? "template" : "log"}.`,
    confirmButtonLabel: `Save Workout ${mode === "build" ? "Template" : ""}`,
  };
};

export const cancelWorkoutConfirmationContent = (mode: Mode) => {
  return {
    title: `Cancel Workout ${mode === "build" ? "Building" : "Logging"}`,
    message: `Confirm cancelling workout ${mode === "build" ? "building" : "logging"}. This will discard the current workout.`,
    confirmButtonLabel: "Discard this workout",
  };
};
