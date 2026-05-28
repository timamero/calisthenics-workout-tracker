import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createRouter,
  ErrorComponent,
} from '@tanstack/react-router';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';

import { WorkoutContextProvider } from '@cwt/context';
import { useSupabaseAuth } from '@cwt/hooks';

import './styles/global.css';

import { supabase } from './services/supabaseClient';
import { routeTree } from './routeTree.gen';
import WorkoutDraftProvider from './providers/WorkoutDraftProvider';
import theme, { resolver } from './theme';

const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  console.log('main || mode is ', import.meta.env.MODE);
  useSupabaseAuth(supabase);
  return <RouterProvider router={router} />;
};

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <WorkoutDraftProvider>
          <WorkoutContextProvider appType="web">
            <App />
          </WorkoutContextProvider>
        </WorkoutDraftProvider>
      </MantineProvider>
    </StrictMode>,
  );
}
