import { createFileRoute } from '@tanstack/react-router';
import { Index } from '../views/Index';

export const Route = createFileRoute('/')({
  component: Index,
});
