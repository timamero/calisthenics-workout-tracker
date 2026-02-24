import { createFileRoute } from '@tanstack/react-router';

import WorkoutDraft from '../components/WorkoutDraft';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  return <WorkoutDraft />;
}
