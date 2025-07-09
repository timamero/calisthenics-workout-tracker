import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { HomeView } from '../views/HomeView';
import { Title } from '@mantine/core';
import { MantineProvider } from '@mantine/core';

export const HomeView = () => {
  return (
    <div>
      <Title>Welcome Home Jane Doe!!</Title>
    </div>
  );
};

test('loads and displays greeting', async () => {
  // ARRANGE
  render(
    <MantineProvider>
      <HomeView />
    </MantineProvider>,
  );

  // ASSERT
  // expect(screen.getByRole('heading')).toHaveTextContent(
  //   'Welcome Home Jane Doe!',
  // );
  const heading = await screen.findByRole('heading', {
    name: /Welcome Home Jane Doe!/i,
  });
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent('Welcome Home Jane Doe!');
  // await waitFor(() => {
  //   expect(screen.getByRole('heading')).toHaveTextContent(
  //     'Welcome Home Jane Doe!',
  //   );
  // });
});
