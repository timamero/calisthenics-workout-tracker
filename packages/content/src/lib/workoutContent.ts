import { Mode } from "@cwt/schema/workouts";

export const emptyWorkoutPlaceholderContent = (mode: Mode) => {
  if (mode === "edit") {
    return {
      heading: "Let's get started",
      message: "Add your exercises, then tap Log to begin tracking.",
    };
  }
  if (mode === "log") {
    return {
      heading: "Nothing to log yet",
      message: "Tap Edit to add some exercises first.",
    };
  }
  return {
    heading: "Ready to start building your workout?",
    message: "Add your first exercise to get started.",
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
