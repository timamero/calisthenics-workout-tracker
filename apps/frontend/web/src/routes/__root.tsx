import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { WorkoutContextProvider } from '@cwt/context';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <WorkoutContextProvider appType="web">
      <Outlet />
      <TanStackRouterDevtools />
    </WorkoutContextProvider>
  );
}
