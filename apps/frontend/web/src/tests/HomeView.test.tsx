import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  MantineProvider,
  Title,
  Stack,
  Button,
  Text,
  Group,
} from '@mantine/core';

test('loads and displays greeting', async () => {
  // ARRANGE
  render(
    <MantineProvider>
      <Stack align="center" justify="center" h="100vh">
        <Stack align="center">
          <Title order={1} size={64}>
            Leverage
          </Title>
          <Text size="xl">
            Your Quick & Easy Path to Calisthenics Fitness. Track Your Progress
            Effortlessly.
          </Text>
        </Stack>

        <Stack mt={80}>
          <Title order={2}>Sign Up or Log In</Title>
          <Group align="flex-start" justify="center" mt={20}>
            <Button variant="filled" size="md" radius="md" color="lime">
              Sign Up
            </Button>
            <Button variant="outline" size="md" radius="md" color="lime">
              Log In
            </Button>
          </Group>
        </Stack>
      </Stack>
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
