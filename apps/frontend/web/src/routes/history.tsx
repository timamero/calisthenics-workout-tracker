import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

export const Route = createFileRoute('/history')({
  component: HistoryView,
});

function HistoryView() {
  return (
    <div>
      <Title>History Page</Title>
      <p>This page will display the user's past workout logs.</p>
    </div>
  );
}
