import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomeView } from '../routes';
import { MantineProvider } from '@mantine/core';

test('loads and displays greeting', async () => {
  // ARRANGE
  render(
    <MantineProvider>
      <HomeView />
    </MantineProvider>,
  );

  // ASSERT
  const heading = await screen.findByRole('heading', {
    name: /Leverage/i,
  });
  const para1 = screen.getByText(
    'Your Quick & Easy Path to Calisthenics Fitness. Track Your Progress Effortlessly.',
  );
  const para2 = screen.getByText('Sign Up or Log In');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent('Leverage');
  expect(para1).toBeInTheDocument();
  expect(para2).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /Sign Up/i });
  expect(button).toBeInTheDocument();
});
