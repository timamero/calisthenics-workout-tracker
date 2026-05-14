import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

export const Route = createFileRoute('/_site/about')({
  component: About,
});

function About() {
  return (
    <div>
      <Title>Hello from About!</Title>
    </div>
  );
}
