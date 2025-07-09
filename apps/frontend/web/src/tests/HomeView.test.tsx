import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomeView } from '../views/HomeView';

test.skip('loads and displays greeting', async () => {
  // ARRANGE
  render(<HomeView />);

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent(
    'Welcome Home Jane Doe!',
  );
});
