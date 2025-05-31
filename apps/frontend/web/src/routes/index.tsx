import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <Title>Welcome Home!</Title>
      <p>This application is in a container.</p>
    </div>
  );
}
