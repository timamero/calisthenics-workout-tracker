import { createFileRoute } from '@tanstack/react-router';

import WorkoutLayout from '../../../components/layouts/WorkoutLayout';

export const Route = createFileRoute('/_auth/workout')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkoutLayout />;
}
