import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/app/')({
  beforeLoad: () => {
    throw redirect({
      to: '/app/dashboard',
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/app/"!</div>;
}
