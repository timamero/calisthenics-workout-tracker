import { createFileRoute } from '@tanstack/react-router';

import HomeView from './-index';

export const Route = createFileRoute('/_site/')({
  component: HomeView,
});
