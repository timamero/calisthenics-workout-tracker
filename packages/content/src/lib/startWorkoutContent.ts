export const startWorkoutContent = (name?: string) => {
  return {
    welcomeHeadline: name
      ? `Let's get to work, ${name}.`
      : "Let's get to work!",
    welcomeSubtext: "What are you doing today?",
    createNewTemplateButton: "Build a template",
    createNewTemplateSublabel: "Save a workout to reuse later.",
    createNewLogButton: "Start a workout",
    createNewLogSublabel: "Log a session as you go.",
  };
};
