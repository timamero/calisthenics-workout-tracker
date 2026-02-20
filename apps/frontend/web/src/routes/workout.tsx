import { createFileRoute } from '@tanstack/react-router';

// import { WorkoutContextProvider } from '@cwt/context';

import WorkoutDraft from '../components/WorkoutDraft';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  return (
    // <WorkoutContextProvider appType="web">
    <WorkoutDraft />
    // </WorkoutContextProvider>
  );
}
