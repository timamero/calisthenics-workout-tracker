import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createRouter,
  ErrorComponent,
} from '@tanstack/react-router';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

import { WorkoutContextProvider } from '@cwt/context';
import { useSupabaseAuth } from '@cwt/hooks';
import { supabase } from './services/supabaseClient';

import { routeTree } from './routeTree.gen';
import WorkoutDraftProvider from './providers/WorkoutDraftProvider';

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

const theme = createTheme({
  cursorType: 'pointer',
  fontFamily: 'Optima, Candara, Noto Sans, source-sans-pro, sans-serif',
  headings: {
    fontFamily:
      'ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, DejaVu Sans Mono, monospace',
  },
});

export const App = () => {
  useSupabaseAuth(supabase);
  return <RouterProvider router={router} />;
};

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <WorkoutDraftProvider>
          <WorkoutContextProvider appType="web">
            <App />
          </WorkoutContextProvider>
        </WorkoutDraftProvider>
      </MantineProvider>
    </StrictMode>,
  );
}
