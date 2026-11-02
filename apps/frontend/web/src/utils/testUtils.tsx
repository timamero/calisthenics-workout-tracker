/**
 * This file contains utility functions for testing React components with the Mantine UI library and TanStack Router.
 * It provides a custom render function that wraps components with the necessary providers for testing.
 * The `customRender` function wraps components with the MantineProvider, while the `customWithFileRouteRender` function wraps components with both the MantineProvider and the RouterProvider for testing components that use file-based routing.
 *
 * References:
 * - [StackOverflow: Using React Testing Library with Providers](https://stackoverflow.com/questions/77403631/using-react-testing-library-how-to-wrap-all-my-test-component-with-providers)
 * - [TanStack Router: Testing File-Based Routing](https://tanstack.com/router/latest/docs/how-to/test-file-based-routing)
 */

import { MantineProvider } from '@mantine/core';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';
import {
  createRouter,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';

import { routeTree } from '../routeTree.gen';
import theme, { resolver } from '../theme';

interface RenderWithFileRoutesOptions extends Omit<RenderOptions, 'wrapper'> {
  initialLocation?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  routerContext?: any;
}

const BaseProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      {children}
    </MantineProvider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: BaseProviders, ...options });

const customWithFileRouteRender = (
  ui: ReactElement,
  {
    initialLocation = '/',
    routerContext = {},
    ...options
  }: RenderWithFileRoutesOptions = {},
) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: routerContext,
    Wrap: ({ children }) => {
      return <BaseProviders>{children}</BaseProviders>;
    },
  });

  function ProvidersWithFileRoute() {
    return <RouterProvider router={router} />;
  }

  return render(ui, { wrapper: ProvidersWithFileRoute, ...options });
};

export * from '@testing-library/react';

export { customRender as render, customWithFileRouteRender as fileRouteRender };
