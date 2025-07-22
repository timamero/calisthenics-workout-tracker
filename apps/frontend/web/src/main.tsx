import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </StrictMode>,
  );
}
