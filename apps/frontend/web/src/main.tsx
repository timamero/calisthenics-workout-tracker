import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createRouter,
  ErrorComponent,
} from '@tanstack/react-router';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {
  createTheme,
  MantineProvider,
  defaultVariantColorsResolver,
  NavLink,
  ActionIcon,
} from '@mantine/core';

import { WorkoutContextProvider } from '@cwt/context';
import { useSupabaseAuth } from '@cwt/hooks';

import './styles/global.css';
import navLinkClasses from './styles/NavLink.module.css';
import actionIconClasses from './styles/ActionIcon.module.css';

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
  autoContrast: true,
  luminanceThreshold: 0.3,
  primaryColor: 'lime',
  white: '#FAF9F6',

  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    // const parsedColor = parseThemeColor({
    //   color: input.color || input.theme.primaryColor,
    //   theme: input.theme,
    // });

    if (input.variant === 'outline') {
      return {
        // ...defaultResolvedColors,
        background: 'var(--mantine-color-white)',
        hover: 'var(--mantine-color-lime-1)',
        color: 'var(--mantine-color-dark-7)',
        border: '1px solid var(--mantine-color-dark-7)',
      };
    }
    if (input.variant === 'filled') {
      return {
        // ...defaultResolvedColors,
        background: 'var(--mantine-color-lime-5)',
        hover: 'var(--mantine-color-lime-3)',
        color: 'var(--mantine-color-dark-4)',
        border: 'none',
      };
    }

    return defaultResolvedColors;
  },

  components: {
    NavLink: NavLink.extend({
      classNames: navLinkClasses,
    }),
    ActionIcon: ActionIcon.extend({
      classNames: actionIconClasses,
    }),
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
