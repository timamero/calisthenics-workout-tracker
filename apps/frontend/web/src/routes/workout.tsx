import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  return <div>Hello "/workout"!</div>;
}
