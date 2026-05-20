import { createFileRoute } from '@tanstack/react-router';
import AddExercise from '../../../components/Workout/AddExercise';

export const Route = createFileRoute('/_auth/workout/add-exercise')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddExercise />;
}
