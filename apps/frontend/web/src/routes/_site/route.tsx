import { createFileRoute } from '@tanstack/react-router';
import SiteLayout from '../../components/layouts/SiteLayout';

export const Route = createFileRoute('/_site')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SiteLayout />;
}
