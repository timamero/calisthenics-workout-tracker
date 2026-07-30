// See reference: https://stackoverflow.com/questions/77403631/using-react-testing-library-how-to-wrap-all-my-test-component-with-providers
import { MantineProvider } from '@mantine/core';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';

import theme, { resolver } from '../theme';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      {children}
    </MantineProvider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

// Override render method
export { customRender as render };
