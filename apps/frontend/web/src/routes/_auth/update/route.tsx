import { createFileRoute } from '@tanstack/react-router';

import WorkoutUpdateLayout from '../../../components/layouts/WorkoutUpdateLayout';

export const Route = createFileRoute('/_auth/update')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkoutUpdateLayout />;
}
