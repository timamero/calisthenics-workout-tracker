import { createFileRoute } from '@tanstack/react-router';

import DashBoardLayout from '../../../components/layouts/DashboardLayout';

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashBoardLayout />;
}
