import { createFileRoute } from '@tanstack/react-router';
import { HomeView } from '../views/HomeView';

export const Route = createFileRoute('/')({
  component: HomeView,
});
