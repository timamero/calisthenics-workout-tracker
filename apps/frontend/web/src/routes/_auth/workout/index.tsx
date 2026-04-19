import { createFileRoute } from '@tanstack/react-router';

import WorkoutDraft from '../../../components/WorkoutDraft';

export const Route = createFileRoute('/_auth/workout/')({
  component: WorkoutView,
});

function WorkoutView() {
  return <WorkoutDraft />;
}
