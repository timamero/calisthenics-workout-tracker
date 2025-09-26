import { Mode } from '@cwt/schema/workouts';

export const saveWorkoutConfirmationContent = (mode: Mode) => {
  return {
    title: `Save Workout ${mode === 'build' ? 'Template' : ''}`,
    message: `Complete and save this ${mode === 'build' ? 'template' : 'log'}.`,
    confirmButtonLabel: `Save Workout ${mode === 'build' ? 'Template' : ''}`,
  };
};
