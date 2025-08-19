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
    name: /Welcome Home Jane Doe!/i,
  });
  const para1 = screen.getByText('xp = 100');
  const para2 = screen.getByText('0 bears around here');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent('Welcome Home Jane Doe!');
  expect(para1).toBeInTheDocument();
  expect(para2).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /one up/i });
  expect(button).toBeInTheDocument();

  await button.click();
  expect(screen.getByText('1 bears around here')).toBeInTheDocument();
});
