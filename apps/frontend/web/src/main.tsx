import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createRouter,
  ErrorComponent,
} from '@tanstack/react-router';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, MantineProvider, Box } from '@mantine/core';

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
  fontFamily:
    'Manrope, Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif',
  fontFamilyMonospace:
    'Source Code Pro, ui-monospace, Cascadia Code, Source Code Pro, Menlo, Consolas, DejaVu Sans Mono, monospace',
  headings: {
    fontFamily:
      'Elms Sans, Seravek, Gill Sans Nova, Ubuntu, Calibri, DejaVu Sans, source-sans-pro, sans-serif',
  },
  primaryColor: 'lime',
  white: '#FAF9F6',
});

export const App = () => {
  useSupabaseAuth(supabase);
  return (
    <Box bg="white" c="dark.7" style={{ minHeight: '100vh' }}>
      <RouterProvider router={router} />
    </Box>
  );
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
